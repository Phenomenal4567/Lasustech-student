# Scholar Portal (Frontend Practice Project)

A lightweight, original student-portal interface built with **plain HTML5, CSS3 and vanilla JavaScript** — no frameworks, no backend, no database. Everything runs locally; just open `index.html` in a browser.

> This is a demo/practice UI of an original design. It is **not** a clone of any real institution's portal. No real authentication, payments, or data submission happens anywhere.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Student login (demo — any entry opens the dashboard) |
| `dashboard.html` | Overview: stats, registered courses, fees, exams, announcements |
| `profile.html` | Student bio data & academic information |
| `courses.html` | Course registration with live unit totals, filtering, print |
| `results.html` | Semester results with tabs and CGPA ring |
| `payments.html` | Fee breakdown & payment history with status filtering |

## Structure
```
student-portal/
  index.html
  dashboard.html
  profile.html
  courses.html
  results.html
  payments.html
  css/style.css
  js/app.js
  assets/
```

## Interactions (all local)
- Sidebar navigation + mobile hamburger menu with overlay
- User dropdown menu
- Tab switching (results by semester)
- Course checkboxes update selected count & total units live
- Course + payment-history filtering
- Demo-only toasts for "register" and "pay" actions
- `Print Course Form` uses the browser print dialog

## Student details used
- Name: Adelakun Abdulsalam
- Matric No: 250405010047

Other academic fields (department, faculty, DOB, etc.) are left as `—` placeholders for you to fill in locally. No academic records were invented as real.

## Run
Open `index.html` directly in any modern browser. No build step, no install.
