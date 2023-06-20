# Big Cloud - e-commerce VapeShop

Big Cloud - VapeShop is a fully-featured e-commerce application developed with React. It presents a user-friendly interface for viewing, sorting, and filtering a variety of vaping products. The application includes robust authentication and profile management features, including a login and registration system that integrates with Firebase for secure data management. It also offers an interactive shopping experience with an integrated cart system and product sorting and filtering capabilities. The interface is enriched with responsive navigation and search features, age verification, and interactive product pages with full details, including image rendering and calculation of discount percentages. Additional features include a contact form integrated with Firebase Firestore, a dynamic footer with a Google Maps location display, and a modal for adding products to the shopping cart. Big Cloud VapeShop leverages Context API to manage state throughout the application, ensuring an efficient and seamless user experience.

## Project Structure

The project is structured into several components and utility functions:

The App component in the code is the entry point of the React application. It sets up the necessary context providers and router for the application. The main component, AppContent, renders the different routes based on the URL path.

The application includes various routes for user authentication and profile management (/login, /register, /profile/:id), shopping functionality (/, /cart, /products/:id), and other pages such as contact and search results.

The App component also includes context providers for the shop context and navbar context, which are used throughout the application to manage state and provide data to components.

Overall, the App component acts as the container for the entire application, providing the necessary context and routing functionality..
.

The Navbar component is a navigation bar that provides links to different pages, a search functionality, and icons for the shopping cart and user profile. It includes a mobile-friendly burger menu for small screens.

- The ProductSearch component is a search bar that suggests matching products as the user types and allows them to navigate to specific product pages.

- **AddToCard** This component represents a modal window for adding products to the shopping cart. It is used to provide feedback to the user when a product is added to the cart.

- **AgeCheck** component is a modal-based age verification component used to restrict access to certain content or features based on age. It prompts the user to confirm their age by clicking "Yes" or "No" buttons. If the user clicks "Yes," the component stores the verification status in local storage, allowing them to access the content. Otherwise, if the user clicks "No," they are redirected to a different website.

- **Footer** component displays a footer section at the bottom of the webpage, including contact information, social media icons, and a newsletter subscription form. It also includes a Google Map for displaying the location. The component is responsive and adjusts its layout based on the screen size.

- **LoginModal** component is a modal that is displayed when the user needs to log in to access a specific feature (for now only adding to favourites). It provides a message informing the user about the login requirement and a button to navigate to the login page. The modal can be closed by clicking on the close icon.

## Pages

- **Shop** component is the main page of the online shop. It displays a carousel with promotional images and information, a navigation bar, and a selection dropdown for sorting the products. It also renders the list of products using the Product component and provides routing for individual product details using react-router-dom. The component utilizes the ShopContext to access the product data and perform sorting operations. It includes social media icons and handles hover effects for Instagram, Facebook, and TikTok icons.

- **Product** component represents an individual product displayed in the shop. It renders the product image, name, price, and additional information such as discounts and bestseller badges. Users can add the product to their cart, add it to favorites, and click on it to view more details. The component also handles the login modal and the add-to-cart modal. It communicates with the ShopContext to access cart items, perform cart operations, and manage favorites. Additionally, it calculates and displays discount percentages. The component is animated using the AOS (Animate On Scroll) library.

- **SearchResults** component displays the search results based on the provided search term. It retrieves the filtered products from the ShopContext and renders them as individual Product components. If there are no matching results, a message is displayed indicating that no offers were found for the searched term, along with some suggestions for the user to try again.

- **Cart** component displays the overall cart contents, including all the cart items. It calculates and displays the total amount to be paid. It also provides buttons for continuing shopping or proceeding to payment. If the cart is empty, it displays a message and a button to browse the available products.

- **CartItem** component is responsible for rendering an individual item within the cart. It displays the product image, name, price, and provides options for adjusting the quantity or removing the item from the cart.

- **Contact** component represents a contact form where users can send messages. It includes input fields for name, email, and message, as well as a submit button. When the form is submitted, the message is sent to a Firebase Firestore collection called "messages" with the timestamp. An animation is displayed to indicate that the message has been sent successfully. If there is an error during the submission process, an alert is shown with the error message.

- **The user folder** contains components and functions related to user information management and authentication

 - **LoginForm** component is responsible for rendering the login form and handling user authentication using email and password. It provides inputs for entering the email and password, handles form submission, and displays error messages if authentication fails. Additionally, it supports social login options using Google, Facebook, and Apple accounts. Upon successful login, the user is redirected to their profile page.

 - **RegistrationForm** component is responsible for rendering the registration form and handling user registration. It provides inputs for entering the user's email, password, first name, last name, street address, city, and postal code. It also includes gender selection options. The form validates the password and password repeat fields, creates a new user account using Firebase authentication, and stores additional user data in the Firestore database. Upon successful registration, a success message is displayed with a link to the login page.

 - **UpdateUser** component is responsible for rendering a form that allows the user to update their password and profile information. It provides inputs for entering a new password and fields for updating the user's first name, last name, email, city, street, and postal code. The component communicates with Firebase to update the user's password and profile data.

 - **User** component displays the user's data, including their name, email, address, order history, and favorite products. It also provides the option to edit the user's profile information and log out. The component retrieves the user's data from Firebase and displays it accordingly.

## Context

- **NavbarContext** and **NavbarProvider** components are part of the context system in app, providing a context for managing the visibility state of the navbar and a loading state. The NavbarContext allows components within its provider to access and update the navbar visibility and loading status. It fixes the z-index problem caused by prompts of matching products while texting in input

- **ShopContext** and **ShopContextProvider**  components are part of the context system in this app, providing a context for managing shopping-related data and actions. The ShopContext allows components within its provider to access and update data such as products, cart items, favorites, and search terms. It also provides functions for adding, removing, and updating cart items, as well as handling user authentication and managing the login modal visibility. Additionally, it includes functions for managing favorites and calculating discount percentages.

## Firebase

- **firebase-config** contains the Firebase configuration and initializes the Firebase app using the provided configuration. It also initializes the Firebase authentication and Firestore services.

- **firebase-products** exports a function addProductsToFirebase that adds a collection of products to Firestore. It retrieves the existing products from Firestore and compares them with the products to be added. If a product with the same ID already exists in Firestore, it skips adding it. Otherwise, it adds the product to Firestore using the setDoc function.

## How to Run

To run the project, you will need to have Node.js and npm installed. You can then clone the repository and install the dependencies using npm:

```bash
git clone <https://github.com/IgorFurman/VapeShop.git>
cd <project-directory>
npm install
npm start
```