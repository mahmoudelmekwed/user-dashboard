# Angular User Dashboard

## Description
This project demonstrates proficiency in Angular (7+) by creating an interactive user dashboard that employs advanced features such as directives and observables. The application retrieves user data from a REST API and allows searching, pagination, and detailed user views. It includes a custom highlight directive, a loading spinner, and efficient caching mechanisms to enhance the user experience.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahmoudelmekwed/user-dashboard.git


2. **Navigate to the project directory:**
    ```bash
    cd user-dashboard

3. **Install dependencies:**
    ```bash
    npm install

4. **Run the application:**
    ```bash
    ng serve

5. **Open your browser and navigate to:**
    ```bash
    http://localhost:4200

## Usage Instructions
Search by ID: Use the search bar in the header to find users by ID. The search results will be displayed on a separate screen.

User List: The main screen displays a paginated list of users. Click on any user card to view detailed information about the user.

Navigation: Use the home button in the header to return to the main user list from any screen.

User Details: Each user details page includes a back button to return to the main user list.

## Project Structure
    src/
    ├── app/
    │   ├── components/
    │   │   ├── header/
    │   │   │   ├── header.component.ts
    │   │   │   ├── header.component.html
    │   │   │   └── header.component.scss
    │   │   ├── user-list/
    │   │   │   ├── user-list.component.ts
    │   │   │   ├── user-list.component.html
    │   │   │   └── user-list.component.scss
    │   │   ├── user-detail/
    │   │   │   ├── user-detail.component.ts
    │   │   │   ├── user-detail.component.html
    │   │   │   └── user-detail.component.scss
    │   │   ├── search-results/
    │   │   │   ├── search-results.component.ts
    │   │   │   ├── search-results.component.html
    │   │   │   └── search-results.component.scss
    │   ├── services/
    │   │   ├── user.service.ts
    │   │   └── search.service.ts
    │   ├── models/
    │   │   └── user.model.ts
    │   ├── directives/
    │   │   ├── highlight.directive.ts
    │   │   └── bubble-pagination.directive.ts
    │   ├── app.component.ts
    │   ├── app.component.html
    │   ├── app.component.scss
    │   ├── app.config.server.ts
    │   ├── app.config.ts
    │   └── app.routes.ts


## Highlighted Features

Custom Directive: A highlight directive that changes the background color of elements it is applied to. The color used is #cbaee9.

Loading Spinner: Displays a loading spinner while data is being fetched to improve user experience.

Caching: Implemented caching mechanisms to avoid redundant HTTP requests, optimizing application performance.

## Contact Information
For questions or contributions, please contact:

Name: Mahmoud Abdelmonem

Email: mahmoud.elmekwed@gmail.com

Phone: +20 102 548 5165
