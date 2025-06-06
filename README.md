# Customer Support Ticket Management System

A simple web application built using Laravel 11, React, and Tailwind CSS.

---

## 🚀 Setup Instructions

### Requirements

- PHP 8.2+
- Composer 2.x+
- Node.js
- MySQL or compatible database
- XAMPP or compatible server  

## Installation Steps

1. **Clone the repository**

```bash

git clone https://github.com/ninidu/ticket-system.git
cd ticket-system
```

2. **Install required dependencies & database migration**
```bash
#install composer
composer install

#Create .env file
cp .env.example .env

#Update database configurations on .env ( ticket_system is database name , you can use any name for it )
DB_CONNECTION=mysql
DB_DATABASE=ticket_system
DB_USERNAME=root
DB_PASSWORD=

#update app path on .env
APP_URL=http://localhost/dashboard/ticket-system/public/tickets
# 'ticket-system' is name of my project folder , you need to change it according to your folder

#Generate app key
php artisan key:generate

#database migration
php artisan migrate
php artisan db:seed

#instal Node packages
npm install

```
2. **Run In Development Mode**

```bash

# Run this on terminal
npm run dev
```
- This starts Vite's development server with hot module replacement (HMR).

- Use your app URL to access the ticket system:
👉 Ex - http://localhost/dashboard/ticket-system/public/tickets

- If you don`t use any server like XAMPP you can run "php artisan serve" command it will run Laravel’s built-in development server and it show address like 'http://127.0.0.1:8000' and need to add "/tickets" to end , you can use it to access the ticket system .

- In development mode, any changes you make to your React or CSS files will be automatically applied without needing a page refresh.

3. **Run In Production Mode**

```bash
# Run this on terminal
npm run build

```
- This compiles and optimizes your assets (JS/CSS) into the public/build directory.

- Use your app URL to access the ticket system:
👉 EX - http://localhost/dashboard/ticket-system/public/tickets

- If you don`t use any server like XAMPP you can run "php artisan serve" command it will run Laravel’s built-in development server and it show address like 'http://127.0.0.1:8000' and need to add "/tickets" to end , you can use it to access the ticket system .

- In production mode, changes to your frontend will not be visible until you rebuild the assets with npm run build.

# React Integration with Blade
This project uses React inside Laravel Blade views, without Inertia or Livewire. The integration is done via Vite, Blade templates, and React components mounted to DOM elements with ids.


## How React is integrated

### Vite setup
Laravel uses Vite (vite.config.js) to bundle index.jsx and other React components.

### Entry file (index.jsx)
This is the main mount file that loads all components (TicketList, CreateTicketForm, EditTicketForm).

### Blade views use @vite
Blade templates like index.blade.php and create.blade.php include @viteReactRefresh and @vite() to load compiled React code.

### React renders into Blade
DOM elements with id="ticket-app" or id="create-ticket-app" are rendered into by React. Props are passed via data-* attributes.

## Example: Blade View Passing Data
        <div
        id="ticket-app"
        data-tickets='@json($tickets)'
        data-flash="{{ session('success') }}"
        data-error="{{ session('error') }}"
        data-status="{{ $status ?? '' }}"
        data-search="{{ $search ?? '' }}"
        data-sort="{{ $sort ?? 'desc' }}"
        data-action="{{ url('/') }}"
        ></div>

## Example: React Mount in index.jsx
    const listApp = document.getElementById('ticket-app');
    if (listApp) {
    const tickets = JSON.parse(listApp.dataset.tickets);
    ReactDOM.createRoot(listApp).render(<TicketList tickets={tickets} />);
    }

## Benefits of This Approach

- Clean separation of server (Blade) and frontend (React)

- No reliance on Inertia.js or Livewire — more flexible and transparent

- Scalable with Tailwind, React Router (if needed), and APIs

- Fast dev loop using npm run dev (Vite hot reload)


# Development Approach & Challenges

## Approach

- Followed a modular React component structure and passed data via Blade

- Implemented server-side filtering, sorting, and searching

- Used Tailwind CSS for styling both Blade and React elements

- Maintained simplicity: no Inertia.js or Livewire to keep control clear between React and Blade

## Challenges & Solutions

| **Challenge**                             | **Solution**                                                                                                                                                      |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Integrating React with Blade**          | Researched Laravel documentation, refer some youtube videos and web blogs, get help of ai tools and then select one method to Integrate.                                       |
| **Tailwind styles not applying in React** | Ensured `app.css` includes all necessary Tailwind directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`). |
| **Laravel validation errors in React**    | Passed `@json($errors->all())` to React via `data-errors` attribute in Blade templates.                                                                           |
| **Flash messages not displaying**         | Added `data-success="{{ session('success') }}"` and `data-error="{{ session('error') }}"` attributes in Blade and handled both in React.                          |

        





