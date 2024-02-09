## Getting Started

To get a local copy of this project up and running on your machine, follow these steps:

### Prerequisites

Before you begin, ensure you have met the following requirements:
* Node.js - [Download & Install Node.js](https://nodejs.org/)
* Composer - [Download & Install Composer](https://getcomposer.org/)
* PHP - [Download & Install PHP](https://www.php.net/)
* MySQL or any other relational database - [Download & Install MySQL](https://dev.mysql.com/downloads/)

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/YoussefAsfar12/crud-laravel-react.git


2. **Install dependencies for the client (React frontend)**:
cd client

npm install

4. **Install dependencies for the server (Laravel backend)**:
cd ../server

composer install




6. **Database Setup**:

Create a new database in MySQL crud_api
Update the database configurations in the .env file with  database crud_api.


5. **Run Migrations **:

php artisan migrate 

6. **Start the Laravel server**:

php artisan serve


7. **Start the React development server (from the client directory)**:

npm run dev


