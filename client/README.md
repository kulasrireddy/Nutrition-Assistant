# NutriPulse Client

Complete rebuilt React frontend for the NutriPulse nutrition and health tracking application.

## Installation

Open a terminal inside the `NutriPulse_Rebuilt_Client` folder:

```bash
npm install
```

Create `.env` by copying `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the client:

```bash
npm run dev
```

Open:

```text
http://localhost:5174
```

Keep the backend running on:

```text
http://localhost:5000
```

The backend CORS configuration must allow `http://localhost:5174`.

## Pages

- Home
- Login
- Register
- Dashboard
- Meal Tracker
- Water Tracker
- BMI Calculator
- Analytics
- Profile
