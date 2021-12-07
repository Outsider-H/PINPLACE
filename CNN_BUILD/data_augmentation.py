# 구글 코랩에 파일 디렉터리 연동하기
from google.colab import drive
drive.mount('/content/gdrive')

import numpy as np
from PIL import Image
import os, glob, numpy as np


# 랜덤시드 고정
np.random.seed(5)

from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img

data_aug_gen = ImageDataGenerator(rescale=1./255, 
                                  rotation_range=15,
                                  width_shift_range=0.1,
                                  height_shift_range=0.1,
                                  shear_range=0.5,
                                  zoom_range=[0.8, 2.0],
                                  horizontal_flip=True,
                                  vertical_flip=False,
                                  fill_mode='nearest')

#저장할 데이터의 디렉터리 경로
caltech_dir = "/content/gdrive/MyDrive/img"

categories = ["Dongdaemun_Design_Plaza", "Gyeongui_Line_Forest_Park", "Naksan_Park", "Namsan_Seoul_Tower","The_Hyundai_Seoul_Mall", 
              "Myeongdong_Cathedral", "Ikseon_Dong_Hanok_Village", "Jamsil_Lotte_Tower", "Han_River_Sebitseom", "Haebangchon"]
nb_classes = len(categories)
for idx, cat in enumerate(categories):
    
    label = [0 for i in range(nb_classes)]
    label[idx] = 1

    image_dir = caltech_dir + "/" + cat
    files = glob.glob(image_dir+"/*.jpg")
    print(cat, " 파일 길이 : ", len(files))
    for f in files:                         
      img = load_img(f)
      x = img_to_array(img)
      x = x.reshape((1,) + x.shape)

      i = 0
      
      #4번 반복하면 빠져 나오도록 설정, 확장자는 jpg로 설정하고 파일 이름 앞에 new를 붙여서 생성
      for batch in data_aug_gen.flow(x, batch_size=1, save_to_dir=image_dir, save_prefix='new', save_format='jpg'):
        i += 1
        if i > 4: 
          break
