# PROG2005 Assessment 2 - Inventory Management System

**Author:** Student Name  
**Unit:** PROG2005 Programming Mobile Systems  
**Assessment:** Assessment 2 - TypeScript and Angular Application

## Project Overview

This project consists of two parts:
1. **Part 1:** A TypeScript-based inventory management system
2. **Part 2:** An Angular-based multi-page inventory management application

Both applications provide comprehensive inventory management features including adding, updating, deleting, and searching for items.

## Part 1 - TypeScript Application

### Features
- Add new inventory items with validation
- Update existing items by name
- Delete items with confirmation prompts
- Search functionality by item name
- Display all items or filter by popular items
- Responsive design for mobile and desktop
- Client-side data validation
- Interactive UI without alert() calls

### Running Part 1
1. Navigate to the `Part1` directory
2. Open `index.html` in a web browser
3. The TypeScript file needs to be compiled to JavaScript:
   \`\`\`bash
   tsc inventory.ts
   \`\`\`

### Data Fields
- Item ID (Unique, Required)
- Item Name (Required)
- Category (Electronics, Furniture, Clothing, Tools, Miscellaneous)
- Quantity (Required, Numeric)
- Price (Required, Numeric)
- Supplier Name (Required)
- Stock Status (In Stock, Low Stock, Out of Stock)
- Popular Item (Yes, No)
- Comment (Optional)

## Part 2 - Angular Application

### Features
- Multi-page application with routing
- Home page with statistics and overview
- Manage Items page with tabs for Add, Update, Delete, and View
- Search page with filtering capabilities
- Security & Privacy analysis page
- Help page with FAQs and troubleshooting
- Reactive forms with validation
- Service-based architecture
- Responsive design

### Application Structure
\`\`\`
Part2/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── manage-items/
│   │   │   ├── search/
│   │   │   ├── security/
│   │   │   └── help/
│   │   ├── models/
│   │   │   └── inventory-item.model.ts
│   │   ├── services/
│   │   │   └── inventory.service.ts
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
\`\`\`

### Running Part 2
1. Navigate to the `Part2` directory
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`
4. Open browser to `http://localhost:4200`

### Building for Production
\`\`\`bash
npm run build
\`\`\`

## Technical Implementation

### TypeScript Features Used
- Interfaces for type safety
- Classes for encapsulation
- Type annotations for parameters and return values
- Array methods (filter, find, map)
- ES6+ features (arrow functions, template literals, destructuring)

### Angular Features Used
- Standalone components
- Reactive programming with RxJS
- Services for data management
- Routing for navigation
- Two-way data binding with ngModel
- Structural directives (*ngIf, *ngFor)
- Event binding and property binding

## Security Considerations

The Security page in Part 2 covers:
- Data encryption (in transit and at rest)
- User authentication and authorization
- Input validation and sanitization
- Audit logging
- Session management
- Data privacy compliance (GDPR, CCPA)
- Regular updates and patching
- Data backup and recovery
- API security
- Mobile-specific security measures

## Data Validation

Both applications implement comprehensive validation:
- Required field validation
- Unique Item ID enforcement
- Numeric validation for quantity and price
- Dropdown validation for categories and statuses
- Client-side validation for immediate feedback

## Responsive Design

Both applications are fully responsive:
- Mobile-first approach
- Flexible grid layouts
- Responsive navigation
- Touch-friendly interfaces
- Optimized for screens from 320px to 1920px+

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Known Limitations

- Data is stored in memory (session-based)
- No server-side persistence
- No user authentication in current version
- No data export functionality

## Future Enhancements

- Backend API integration
- Database persistence
- User authentication and authorization
- Data export (CSV, Excel, PDF)
- Advanced filtering and sorting
- Barcode scanning integration
- Multi-language support
- Dark mode

## Academic Integrity Declaration

I declare that this submission is my own original work, referenced appropriately, and has not been previously submitted. I have adhered to the guidelines regarding Generative AI use as specified in the assessment brief.

## GenAI Usage

[If applicable, describe how GenAI was used according to the permitted guidelines]

## References

- Angular Documentation: https://angular.io/docs
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- MDN Web Docs: https://developer.mozilla.org/

---

**Submission Date:** [Insert Date]  
**Unit Code:** PROG2005  
**Assessment:** Assessment 2 (40%)
