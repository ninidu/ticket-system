# Laravel Ticket System (React + Blade)

A simple Customer support ticket management application built using Laravel 11, React, and Tailwind CSS.

---

## 🚀 Setup Instructions

### Requirements

- PHP 8.2+
- Composer
- Node.js and npm
- Laravel 11
- MySQL or compatible database
- XAMPP (for local server setup)

# before below step you need to install above requirements 

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ticket-system.git
cd ticket-system

#Setup ticket-system( run below command on terminal )

composer install
cp .env.example .env

#Update .env configurations
DB_DATABASE=ticket_system
DB_USERNAME=root
DB_PASSWORD=

#update app path to
APP_URL=http://localhost/dashboard/ticket-system/public
# 'ticket-system' is name of my project folder , you need to change it according to your folder

#Generate app key
php artisan key:generate

#database migration
php artisan migrate
php artisan db:seed

#instal Node packages
npm install


# you can run ticket system with Local server or directly on your server


# If Run local server
npm run dev
php artisan serve

# then click in URL like "http://127.0.0.1:8000" it redirect you to 404 browser page then u need to add "/tickets" end of that url like "http://127.0.0.1:8000/tickets" it redirect you to main page of Customer support ticket system and now you can acess all features of system.



# If Run directly on your server
npm run build

# after complete npm run build command you can access Customer support ticket system with your APP_URL but you need to add "/tickets" end of url , my url like below

http://localhost/dashboard/ticket-system/public/tickets


## End of Setup ticket-system


# React Integration with Blade
    This project uses React inside Laravel Blade views, without Inertia or Livewire. The integration is done via Vite, Blade templates, and React components mounted to DOM elements with ids.


#How React is integrated

#Vite setup
    Laravel uses Vite (vite.config.js) to bundle index.jsx and other React components.

#Entry file (index.jsx)
    This is the main mount file that loads all components (TicketList, CreateTicketForm, EditTicketForm).

#Blade views use @vite
    Blade templates like index.blade.php and create.blade.php include @viteReactRefresh and @vite() to load compiled React code.

#React renders into Blade
    DOM elements with id="ticket-app" or id="create-ticket-app" are rendered into by React. Props are passed via data-* attributes.



#Conceptual Workflow
    Laravel Blade handles routing and server-side rendering.

    Each Blade file includes a div (e.g., #ticket-app) with ticket data passed as a data-* prop.

    React components are mounted to these elements based on their presence in the DOM.

    Tailwind CSS is shared between Blade and React views.


#Example: Blade View Passing Data
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


#Example: React Mount in index.jsx
    const listApp = document.getElementById('ticket-app');
    if (listApp) {
    const tickets = JSON.parse(listApp.dataset.tickets);
    ReactDOM.createRoot(listApp).render(<TicketList tickets={tickets} />);
    }


# Benefits of This Approach

    Clean separation of server (Blade) and frontend (React)

    No reliance on Inertia.js or Livewire — more flexible and transparent

    Scalable with Tailwind, React Router (if needed), and APIs

    Fast dev loop using npm run dev (Vite hot reload)


#Development Approach & Challenges

    Followed a modular React component structure and passed data via Blade

    Implemented server-side filtering, sorting, and searching

    Used Tailwind CSS for styling both Blade and React elements

    Maintained simplicity: no Inertia.js or Livewire to keep control clear between React and Blade

#Challenges & Solutions

Challenge - How to Integrate React with Blade
Solution  - Refer Integrate method on laravel documentation , refer some youtube videos and web blogs , get help of ai tools and then select one method to Integrate.

Challenge - Tailwind styles not applying in React
Solution  - Import important component to app.css

Challenge - Laravel validation errors in React	
Solution  - Passed $errors->all() via data-errors in Blade

Challenge -  Flash messages can`t show in system
Solution  -  Passed success and error  via data-success="{{ session('success') }}" 
              data-error="{{ session('error') }}" in Blade 





