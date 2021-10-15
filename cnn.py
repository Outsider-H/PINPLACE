from google.colab import drive
drive.mount('/content/gdrive')

#데이터 전처리 및 파일 업로드
#파일사이즈는 64*64 크기로 줄여서 입력하였고 카테고리로 10가지 장소을 입력하여 npy로 저장
from PIL import Image
import os, glob, numpy as np
from sklearn.model_selection import train_test_split
import tensorflow as tf


caltech_dir = "/content/gdrive/MyDrive/place_dataset"
categories = ["Dongdaemun_Design_Plaza", "Gyeongui_Line_Forest_Park", "Naksan_Park", "Namsan_Seoul_Tower","The_Hyundai_Seoul_Mall", 
              "Myeongdong_Cathedral", "Ikseon_Dong_Hanok_Village", "Jamsil_Lotte_Tower", "Han_River_Sebitseom", "Haebangchon"]
nb_classes = len(categories)

image_w = 64
image_h = 64

pixels = image_h * image_w * 3

X = []
y = []

for idx, cat in enumerate(categories):
    
    label = [0 for i in range(nb_classes)]
    label[idx] = 1

    image_dir = caltech_dir + "/" + cat
    files = glob.glob(image_dir+"/*.jpg")
    print(cat, " 파일 길이 : ", len(files))
    for i, f in enumerate(files):
        img = Image.open(f)
        img = img.convert("RGB")
        img = img.resize((image_w, image_h))
        data = np.asarray(img)

        X.append(data)
        y.append(label)

X = np.array(X)
y = np.array(y)



X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1)
xy = (X_train, X_test, y_train, y_test)
np.save("/content/gdrive/MyDrive/image_data.npy", xy)

#npy파일을 가져온다.
import os, glob, numpy as np
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from keras.callbacks import EarlyStopping, ModelCheckpoint
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import backend as k


config = tf.compat.v1.ConfigProto()
config.gpu_options.allow_growth = True
session = tf.compat.v1.Session(config=config)



X_train, X_test, y_train, y_test = np.load('/content/gdrive/MyDrive/image_data.npy',allow_pickle = True)
print(X_train.shape)
print(X_train.shape[0])


#일반화시켜 input값의 범위 조정
categories = ["Dongdaemun_Design_Plaza", "Gyeongui_Line_Forest_Park", "Naksan_Park", "Namsan_Seoul_Tower","The_Hyundai_Seoul_Mall", 
              "Myeongdong_Cathedral", "Ikseon_Dong_Hanok_Village", "Jamsil_Lotte_Tower", "Han_River_Sebitseom", "Haebangchon"]
nb_classes = len(categories)

X_train = X_train.astype(float) / 255
X_test = X_test.astype(float) / 255

#CNN모델 생성

with tf.device('/device:GPU:0'):
    model = Sequential()
    model.add(Conv2D(32, (3,3), padding="same", input_shape=X_train.shape[1:], activation='relu'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(32, (3,3), padding="same", input_shape=X_train.shape[1:], activation='relu'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(64, (3,3), padding="same", activation='relu'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(64, (3,3), padding="same", activation='relu'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(128, (3,3), padding="same", activation='relu'))
    model.add(Conv2D(128, (3,3), padding="same", activation='relu'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(128, (3,3), padding="same", activation='relu'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(256, activation='relu'))
    model.add(Dropout(0.5))
    
    model.add(Dense(nb_classes, activation='softmax'))
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
    model_dir = './model'
    
    if not os.path.exists(model_dir):
        os.mkdir(model_dir)
    
    model_path = model_dir + '/multi_img_classification.model'
    checkpoint = ModelCheckpoint(filepath=model_path , monitor='val_loss', verbose=1, save_best_only=True)
    early_stopping = EarlyStopping(monitor='val_loss', patience=6)

#모델 형태를 표로 요약
model.summary()

#모델 학습하기

history = model.fit(X_train, y_train, batch_size=32, epochs=50, validation_split=0.1, callbacks=[checkpoint, early_stopping])

#모델 정확도 출력
print("정확도 : %.4f" % (model.evaluate(X_test, y_test)[1]))



import matplotlib.pyplot as plt
# summarize history for accuracy
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('model accuracy')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()
# summarize history for loss
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()
