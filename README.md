# Big Cloud - e-commerce VapeShop
![App Screenshot](https://i.imgur.com/5xCliIK.png) 

Check it out live [here](https://igorfurman.github.io/VapeShop/).

Big Cloud - VapeShop is a robust, feature-rich e-commerce application developed with **React.js**. It offers an intuitive user experience, complete with product viewing, sorting, and filtering capabilities, alongside an integrated cart system and robust profile management features.

## 🎯 Features
* Fully-fledged e-commerce capabilities
* Authentication and profile management via Firebase
* Interactive shopping with a cart system
* Product sorting and filtering
* Age verification mechanism
* Contact form with Firebase Firestore integration
* Responsive navigation and dynamic searching
* Google Maps location display
* Add to cart modal
* Add to favorites list while logged management via Firebase

## 🏗️ Project Structure

The project is structured into several reusable components: `App`, `Navbar`, `ProductSearch`, `AddToCard`, `AgeCheck`, `Footer`, and `LoginModal`.

### 📄 Pages

The project consists of multiple pages including: `Shop`, `Product`, `ProductDetails`, `SearchResults`, `Cart`, `CartItem`, and `Contact`.

### 👤 User Components

User-related components include: `LoginForm`, `RegistrationForm`, `UpdateUser`, and `UserProfile`.

### ⚙️ Context

The application uses the `NavbarContext` and `ShopContext` to manage state throughout the app.

## 🔥 Firebase Integration

The project uses Firebase as its backend service for real-time database, authentication and cloud storage functionalities.

## 🚀 How to Run

To run the project, ensure that you have Node.js and npm installed. Then, clone the repository and install the dependencies:

```bash
git clone https://github.com/IgorFurman/VapeShop.git
cd VapeShop
npm install
npm start
