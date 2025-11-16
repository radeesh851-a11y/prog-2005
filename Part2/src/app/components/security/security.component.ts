/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Security and privacy analysis page
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {
  // Security topics for the page
  securityTopics = [
    {
      icon: '🔒',
      title: 'Data Encryption',
      description: 'All sensitive data including item prices, supplier information, and business data should be encrypted both in transit (using HTTPS/TLS) and at rest (using database encryption). This ensures that even if data is intercepted or accessed unauthorized, it cannot be read without the proper decryption keys.'
    },
    {
      icon: '👤',
      title: 'User Authentication',
      description: 'Implement strong authentication mechanisms such as multi-factor authentication (MFA) to verify user identities. This prevents unauthorized access to the inventory system. Use secure password hashing algorithms like bcrypt or Argon2 to store user credentials safely.'
    },
    {
      icon: '🛡️',
      title: 'Authorization & Access Control',
      description: 'Implement role-based access control (RBAC) to ensure users can only access features and data relevant to their role. For example, regular staff might only view inventory, while managers can modify it. This principle of least privilege minimizes potential security breaches.'
    },
    {
      icon: '📱',
      title: 'Input Validation',
      description: 'All user inputs must be validated and sanitized to prevent injection attacks (SQL injection, XSS). Implement both client-side and server-side validation. Use parameterized queries and escape special characters to protect against malicious input.'
    },
    {
      icon: '🔍',
      title: 'Audit Logging',
      description: 'Maintain comprehensive logs of all system activities including user logins, data modifications, and access attempts. These logs should include timestamps, user IDs, and action details. Regular review of these logs helps detect suspicious activities and ensures accountability.'
    },
    {
      icon: '🔐',
      title: 'Session Management',
      description: 'Implement secure session handling with automatic timeouts, secure cookie attributes (HttpOnly, Secure, SameSite), and proper session invalidation on logout. Regenerate session IDs after authentication to prevent session fixation attacks.'
    },
    {
      icon: '📊',
      title: 'Data Privacy Compliance',
      description: 'Ensure compliance with data protection regulations (GDPR, CCPA, etc.). Implement data minimization principles - only collect necessary information. Provide users with transparency about data usage and offer data export/deletion capabilities.'
    },
    {
      icon: '🔄',
      title: 'Regular Updates & Patching',
      description: 'Keep all system components, frameworks, and dependencies up to date with the latest security patches. Regularly audit third-party libraries for known vulnerabilities. Implement an automated update process where possible.'
    },
    {
      icon: '💾',
      title: 'Data Backup & Recovery',
      description: 'Implement regular automated backups of all inventory data to prevent data loss. Store backups securely in multiple locations. Test recovery procedures regularly to ensure data can be restored quickly in case of system failure or security breach.'
    },
    {
      icon: '🌐',
      title: 'API Security',
      description: 'If the system exposes APIs, implement proper authentication (OAuth 2.0, JWT), rate limiting to prevent abuse, and input validation. Use HTTPS for all API communications and implement CORS policies to control which domains can access your API.'
    }
  ];
}
