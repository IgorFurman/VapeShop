# README - Product Sorting and Filtering in React

This project is an e-commerce-like application made using React. The main functionality of the application is to provide an interface for displaying, sorting and filtering a list of products. Below is a brief summary of the structure and functionality of the application.

## Project Structure
The project is structured into several components and utility functions:

- **App.js**: This is the root component of the application where we define our state variables and callback functions.

- **ProductList.js**: This component takes in a list of products and renders them on the page.

- **ProductCard.js**: This component displays the individual product details.

- **SortFilterBar.js**: This component provides the user interface for sorting and filtering the products.

- **utils.js**: This module contains utility functions for sorting and filtering the products.

## Functionality
The application provides the following functionality:

- **Display Products**: The application fetches the products from a given array and displays them in a grid using the ProductList and ProductCard components.

- **Sort Products**: The application allows the user to sort the products based on different criteria like price and availability. The actual sorting is done by a utility function, `sortProducts`, which takes in the products and a sorting criteria as parameters and returns a new sorted array.

- **Filter Products**: The application allows the user to filter the products based on availability or if the product is a bestseller. The actual filtering is done by a utility function, `filterProducts`, which takes in the products and a filtering criteria as parameters and returns a new filtered array.

## How to Run
To run the project, you will need to have Node.js and npm installed. You can then clone the repository and install the dependencies using npm:

```bash
git clone <repository-url>
cd <project-directory>
npm install
npm start
