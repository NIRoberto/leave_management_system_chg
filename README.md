
#  Leave Management System

A modern leave management system built with a full-stack architecture to streamline employee leave applications, approvals, and HR management.



##  Tech Stack

**Frontend:**
- ⚛️ React (TypeScript)
-  Tailwind CSS
-  TanStack Query (React Query)
-  Microsoft OAuth (via MSAL)
-  Context API (for optional global state)

**Backend:**

-  Spring Boot (Java)
-  MySQL Database
-  Spring Security (Microsoft OAuth2)
-  Swagger / OpenAPI

##  Authentication

- Integrated with **Microsoft OAuth**
- On production, only users with an `@ist.com` email are allowed
- Auto-fetches and displays Microsoft profile picture as avatar


##  Features

### 👥 Employee Dashboard
- View leave balance
- Apply for leave (Full/Half day)
- Check leave history & status
- Upload supporting documents
- Calendar showing public holidays and team members on leave

###  Leave Application
- Select from multiple leave types (Annual, Sick, Maternity, etc.)
- Input reason (optional or required depending on type)
- Upload documents (e.g., medical certificates)
- Track leave status in real-time

###  Approval Workflow
- Managers/Admins can approve/reject with comments
- Email & in-app notifications for approvals

###  Leave Balance Management
- Auto-accrual (e.g., 1.66 days/month)
- Carry forward up to 5 days
- Admin manual adjustments

###  Admin / HR Panel
- Manage leave types & accrual rules
- Adjust balances
- View leave calendars by team/department
- Export reports (CSV/Excel)

###  Team Calendar
- Filter by team/location
- View who’s on leave
- Optional Outlook sync

###  Notifications & Alerts
- Leave submitted
- Approval status
- Upcoming leaves
- Pending approvals

###  Roles & Permissions
- **Staff**: Apply & view own leaves  
- **Manager**: Approve leaves of team  
- **Admin**: System-wide settings and reports


##  Project Structure (Frontend)


src/
├── api/               # React Query API hooks
├── components/        # Reusable UI components
├── features/          # Feature-based structure
├── layouts/           # Role-based layouts
├── pages/             # Route-level pages
├── hooks/             # Custom global hooks
├── lib/               # Utilities (e.g., axios config, auth)
├── types/             # TypeScript types/interfaces
└── routes/            # Protected routes by role
```



##  Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/leave-management-system.git
cd leave-management-system
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd backend
# Import MySQL schema and configure application.yml with DB credentials
./mvnw spring-boot:run
```


## Environment Variables

### Frontend (`.env`)
```env.example
API_URL=http://localhost:8080/api



### Backend (`application.yml`)
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/leave_management
    username: your_db_user
    password: your_db_password
  security:
    oauth2:
      client:
        registration:
          azure:
            client-id: your_client_id
            client-secret: your_secret
```



## 📘 API Reference

The backend uses REST APIs documented with Swagger:

- `/api/auth`
- `/api/leave`
- `/api/users`
- `/api/approvals`



##  License

MIT License © [NIRoberto ]



## Contributions

We welcome pull requests! Please open an issue first to discuss what you’d like to change.



## Contact

For support or inquiries, reach out to **robertwilly668@gmail.com**
or open an issue on GitHub.
```

## Acknowledgements

- [React](https://reactjs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [MySQL](https://www.mysql.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Microsoft OAuth](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview)
- [TanStack Query](https://tanstack.com/query/v4)

##  Future Enhancements

- Mobile app version
- Advanced analytics dashboard
- Integration with other HR tools
- Multi-language support
- Dark mode
- Customizable leave policies
- Performance optimizations
- User feedback system
- Enhanced security features
- AI-based leave prediction
- Integration with payroll systems




