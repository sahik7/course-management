# Course Manager with Multiple Queries ( Assignment-3 )

## Live-link : https://assignment-3-lemon.vercel.app/

## Video-link : https://drive.google.com/file/d/1ULZQtQZ3x5l14D6l2IEx_-zA0uSZ0Ccl/view?usp=sharing

## How To Run The Project Locally ?

- **step 1** - You need to first clone this project. Go to the command line and paste this code for clone ```git clone https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-sahik7.git```. Or just simple click the code button and use the https link instead.

- **step 2** - Open the project ( VS code is recommended ) then open the terminal ```crtl + J```. Write ```npm install``` to get the **node_modules** folder.

- **step 3** - Use ```npm run build``` which automatically create a dist folder and transform all the typescript file into javascript. This folder will replicate the structure of the app folder.

- **step 4** - To store all the confidential information safely create ```.env``` file in the root of the project. Follow .env.example folder to get an Idea on how to put informations properly.

- **step 5** - The project is good to go. In the terminal write ```npm run dev``` to start the server and check for a message which includes **Example app listening on port 5000** confirms that the server is working properly.

- **step 6** - Now give a final check to the browser. In the link address bar write ```http://localhost:5000/```. If the browser shows ```Hello World``` then everything is working properly.

- **step 7** - Add these endpoint api to get your desired results.

| Results | Api |
| -------|:--------------:|
| **Course Related Apis** |
| Create a course  | http://localhost:5000/api/course  |
| Get all courses  | http://localhost:5000/api/courses  |
| Get courses according to page  | http://localhost:5000/api/courses/?page=2  |
| Get limited courses by setting the limit  | http://localhost:5000/api/courses/?limit=10  |
| Get limited courses by Price Range  | http://localhost:5000/api/courses/?minPrice=20.00&maxPrice=50.00  |
| Get limited courses by Date Range  | http://localhost:5000/api/courses/?startDate=2023-01-01&endDate=2023-12-31  |
| Get courses by tags  | http://localhost:5000/api/courses/?tags=Programming  |
| Get courses by language  | http://localhost:5000/api/courses/?language=Hindi  |
| Get courses by provider  | http://localhost:5000/api/courses/?provider=Tech  |
| Get courses by durationInWeeks  | http://localhost:5000/api/courses/?durationInWeeks=102  |
| Get courses by level  | http://localhost:5000/api/courses/?level=Advanced  |
| **Sorting Courses Related Apis** |
| Get courses by sorting with title | http://localhost:5000/api/courses/?sortBy=title  |
| Get courses by sorting with price  | http://localhost:5000/api/courses/?sortBy=price  |
| Get courses by sorting with starting Date  | http://localhost:5000/api/courses/?sortBy=startDate  |
| Get courses by sorting with end Date | http://localhost:5000/api/courses/?sortBy=endDate  |
| Get courses by sorting with Language | http://localhost:5000/api/courses/?sortBy=language  |
| Get courses by sorting with Duration in weeks | http://localhost:5000/api/courses/?sortBy=durationInWeeks  |
| **Sorting Courses In Ascending Or Descending Order Related Apis** |
| Use any sorting method then add sortOrder=asc or sortOrder=desc | http://localhost:5000/api/courses/?sortBy=price&sortOrder=desc  |
| **Category Related Apis** |
| Create a category  | http://localhost:5000/api/categories  |
| Get categories   | http://localhost:5000/api/categories  |
| **Review Related Apis** |
| Create a category  | http://localhost:5000/api/reviews  |
| **Others Apis** |
| Get Course by ID with Reviews  | http://localhost:5000/api/courses/:courseId/reviews  |
| Get the Best Course Based on Average Review  | http://localhost:5000/api/course/best |
