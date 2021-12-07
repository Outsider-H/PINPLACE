# SWE3028_Capstone Project_Team H

[![——————————————————————————](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

> Topic : CNN based Location Image Search and its Adaptation to Social Network, PINPLACE
>
> Team Member : 엄지용, 이지섭, 정채원, 채승윤, 홍성준
> 
> Repository Structure
> 
[![——————————————————————————](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)
 

# Introudction of PINPLACE

[![——————————————————————————](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

<h3>0. Summary</h3>
<img src="./pinplace.png">
<br>

[![——————————————————————————](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

<h3> 1. Objective </h3>
 “CNN based place recognition web app”
 <br>
- 01. Service of place recognition feature & SNS feature.
 <br>
- 02. Collect data set & Build CNN models which have the best accuracy
 <br>
- 03. Work on UI design & graphic Design
 <br>
- 04. Apply CNN models on web app
<br>


[![——————————————————————————](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)


<h3> 2. Application's Structure </h3>
------------------------------------------------------------------------------

<h4> a. User Flow <h4>
 <p> The following is a user flow diagram, which shows the connectivity and hierarchy between our web pages.
 </p>
<img src="./userflow.png">
 <br>

------------------------------------------------------------------------------

<h4> b. Page Lists (10 pages) <h4>
<p>≪  Cover page / Start Page / User Guide Page / Signup Page / Login Page <br> <br>
 / Find Location Page / List Up Page / Upload Picture Page / SNS Page / My Page  ≫ </p>
 <br>

------------------------------------------------------------------------------

<h4> c. Description of each page  <h4>

<p>

	
a.	Cover page :
 Since it is the first screen that users face, We designed the logo ourselves because we thought we had to firmly convey the platform brand image.
<br><br>

b.	Start Page :
 This page is expressed in fancy graphics to roughly imply the functionality of our platform<br>
	<br>


c.	User Guide Page :
 For optimal UX, we made this page with Card UI. Every time user turn the page, the content and design are designed to be different. <br>


d.	Sign Up Page :
 This page is for new users who want to make an account for this service. Currently this includes four text or password boxes, and a submission button. <br>



e.	Login Page :
 To use the service, users need to sign in via this page. Among the information provided in the sign-up page, ID is unique for each user: thus, ID and password are needed to log in. Additionally, there is the button to the sign-up page for who doesn’t have an account for this service. <br>



f.	Find Location Page :
 This page is core function page. We connect with CNN model that we made ourselves.  <br>


g.	List Up page :
 This page shows the list of places serviced, by popularity. Popularity can be measured by daily, weekly, or monthly. Each place entry is clickable and shows a subpage for that place. <br>


h.	Upload Picture Page :
 This page is prepared for improving AI model, so the location information for the picture is necessary. The dropdown list for locations needed is served. <br>


 
i.	SNS Page :<br>




j.	My Page :
This is the own user page for a user logged in, which shows pictures uploaded by that user from find location page. 


<br>
 
</p>


# Output
<h3> 1. Inital UI design </h3>
https://www.figma.com/file/kPRSZqt6wzZ49x4qpmfjma/캡스톤-UI?node-id=0%3A1
<br>
