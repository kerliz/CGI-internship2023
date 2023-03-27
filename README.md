


## Added functionalities
Uses dummy user `John Doe`

* `Library page `
   - Filtering - filter books by status (Available, Borrowed or Returned) - book appears to returns after user has borrowed a book and then returned it from my books tab
   - Sorting - sort books by title, author and year
   - Searching - search by title, author, genre and year (case-insensitive)
   - Sorting works also with search and filtering
   - Adding books to favorites - add book to favorites <span style="color: yellow">&#9733;</span> (works from Checkouts and Library page)
---
* `Checkouts`
   * Possible to sort by every value on the page
   * Implemented different pagination than in `Library page` view
---
* `My Books`
   - View for my borrowed books
   - Possible to return borrowed books, which changes book status to <a style="color:white; text-decoration:none; background-color:rgb(13,202,240); font-size:13px; padding:1px 6px; border-radius:5px;">Returned </a>

---
* `Book view`
   - Clicking on a title (from all pages) opens up single book view with information of book and possibility to borrow it
   - When book as exceeded the duedate, it gives warning that it's  <span style="color:red;">OVERDUE</span>
   - When borrowing book it gives pop-up modal with due date 2 weeks from current date
   - After borrowing a book it also shows the data in `Checkouts` tab

---

### Impressions 


Since it was my first project using Angular and Spring boot or Java at all, then at first everything was quite difficult.
Eventually the most difficult thing turned out to be sorting which I implemented in the end thinking this is going to be the easiest. <br>
Implementing search on the other hand was much easier. It was one of the first things I wanted to work on, but couldn't. After some time coming back to it, it turned out to be one of the easiest things.


Eventually I watched a lot of youtube videos and used some code snippets or ideas from there but at first it was too overwhelming to document what exactly I used from where since i didn't get everything to work
<br>
[This](https://www.youtube.com/watch?v=JNxWZXOsU0w&ab_channel=GetArrays) was the video that gave me the most base for my code <br>

Overall I enjoyed working on this project, wish i had more time. Since I'm having specialisation sprint at the same I wasn't able to dedicate as much time I would have liked

----------------------------------------------------------------------------
---

# Test assignment

Welcome to CGI test assignment!
This is the project template which contains Angular front-end and Spring Boot back-end

## Setting up Spring Boot application.

1. Make sure you have installed Java. For development OpenJDK 11 from [Adoptium](https://adoptium.net/) should be used.
2. Install Intellij IDEA Commmunity edition
3. Import the Maven project
4. Run the LibraryApplication from IDE.

However, you can also install Maven and run the back-end from terminal with
`mvn spring-boot:run` in project directory
(make sure your JAVA_HOME variable is set up to point to
your Java 11 installation in that case)

## Setting up Angular application.

To get Angular app up and running you need to:

1. Make sure you have [NodeJS](https://nodejs.org/en/download/) version 18+ installed.
2. Open the terminal.
3. Navigate to frontend project `cd frontend/`
4. Install all dependencies with npm `npm install`. NB: This might take a while.
5. Start the development server `npm run start`.
   Frontend runs on port 4200, so make sure it's not in use.
   
   First build takes a lot of time, so be patient...

   ![Compiling](https://imgs.xkcd.com/comics/compiling.png)
6. Once development server is running, open app at http://localhost:4200. If you can see a list of books then it means that you have sucessfully set up and run the application
7. Start coding :)

##General guidelines

* Tasks don't have to be completed in order.
* Try to complete as many as possible. 
* You are free to modify both front-end and back-end as you deem necessary. This includes the option to use another front-end framework if you wish.
* Regarding UI design, you are also free to choose: use Material Design components, your favorite library or implement everything yourself.
* You can and are encouraged to also implement additional cool features that you think would
really help showcase and distinguish your skills.

* We appreciate if you use version control and commit often, so we can also get an insight into your
workflow and how you approached the problems. 

* Please document your added functionality, it would be helpful if you point out what was easy / difficult / interesting etc

* If you are using in your solution code written by other people 
(examples, tutorials, StackOverflow etc), then please cite the source for these blocks
in your solution using comments. This helps us distinguish code written by you.

If you have any questions, please reach out without hesitation. Best of luck!

##Development tasks

* Using backend api endpoint /getBooks, implement table of books view
* Using backend api endpoint /getCheckouts, also implement the checkouts view. Suppport paging and sorting for both views
* Implement individual book and checkout view, support basic CRUD operations, implement checking out and returning books
* Implement searching for books using freetext criteria
* Implement filtering for books by status
* Implement saving / displaying favorite books for current user (you can use localStorage if you don't want to make back-end changes)
* Add modal confirmation dialogues when deleting or checking out books
* Implement a user-friendly way to display late checkouts

#####Bonus tasks:
* Implement advanced search form for books, where user can specify and combine different criterias (title, author year etc)
* Add UI and backend tests 
* Add support for multiple languages
* Add support for multiple users and different user roles: reader and librarian.
Reader should not be able to add / modify / delete existing book information or tamper with checkouts
but should be able to save favorites and check out / return books (that they have checked out)
* Containerize your application to make it cloud-native

