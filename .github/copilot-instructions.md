# GitHub Copilot Instructions for TikMatrix Desktop

## Project Overview

TikMatrix Desktop is a social media automation matrix management software that controls multiple (1-100) Android phones through PC software for real-time screen mirroring, task scheduling, account management, and content management.

## Technology Stack

- **Frontend Framework**: Vue 3 (Composition API and Options API)
- **Desktop Framework**: Tauri v1 (Rust backend)
- **UI Framework**: daisyUI + Tailwind CSS
- **Build Tool**: Vite
- **Language Support**: i18n with English, Chinese (CN), and Russian (RU)

## Architecture

### Project Structure

- `/src` - Vue 3 frontend application
  - `/components` - Reusable Vue components
  - `/api` - API service layer
  - `/i18n` - Internationalization files
  - `/utils` - Utility functions
  - `/service` - Business logic services
  - `/composables` - Vue 3 composables
  - `/config` - Configuration files
- `/src-tauri` - Rust backend (Tauri)
  - `/src` - Rust source code
  - `/icons` - Application icons
  - `/i18n` - Backend i18n files
- `/scripts` - Build and automation scripts
- `/whitelabel` - White-label configuration
- `/docs` - Documentation

### Data Storage

- Store data in `AppData/data` directory
- Use local storage for user preferences
- Configuration files in JSON format

## Coding Standards

### General Principles

1. **Simplicity First**: Avoid over-engineering. Keep code simple, understandable, and practical
2. **Code Reusability**: Pay attention to cyclomatic complexity and maximize code reuse
3. **Module Design**: Use design patterns where appropriate
4. **Minimal Changes**: When modifying code, minimize changes and avoid affecting other modules
5. **No Unnecessary Documentation**: Don't create markdown files unless specifically requested

### Language and Comments

- **Code Comments**: Always write comments in English
- **Response Language**: Always Summary in Chinese (中文)
- **Search**: Use English when searching for information or documentation

### Vue.js Conventions

- Follow Vue 3 best practices
- Use Composition API for new components when appropriate
- Support both Options API and Composition API patterns
- Keep components focused and single-purpose
- Use props for parent-child communication
- Emit events for child-parent communication

### Styling

- Use Tailwind CSS utility classes
- Follow daisyUI component patterns
- Use responsive design principles
- Maintain consistent spacing and layout

### Internationalization

- All user-facing text must support three languages: EN, CN, RU
- Use the i18n framework for all strings
- Add translation keys to appropriate i18n files
- Never hardcode user-facing strings

### File Naming

- Vue components: PascalCase (e.g., `TitleBar.vue`, `ManageDevices.vue`)
- JavaScript/TypeScript files: camelCase (e.g., `storage.js`, `supportNotifications.js`)
- Configuration files: kebab-case (e.g., `tauri.conf.json`, `vite.config.js`)

## Build and Development Commands

### Development

```bash
npm install              # Install dependencies
npm run dev             # Start Vite dev server
npm start               # Start Tauri development mode
npm run tauri dev       # Alternative Tauri dev command
```

### Building

```bash
npm run build                      # Build frontend for production
npm run build:agent               # Build agent (release mode)
npm run build:agent-debug         # Build agent (debug mode)
npm run build:whitelabel          # Build white-label version
```

### Code Quality

```bash
npm run lint            # Run ESLint
npm run lint:fix        # Run ESLint with auto-fix
```

### Testing

```bash
npm run preview         # Preview production build
```

## Related Ecosystem Projects

1. **tikmatrix-desktop** (this repo): Client application for TikMatrix and IgMatrix
2. **tikmatrix-agent**: Local Rust service shared by both clients, runs on port 50809
3. **tikmatrix-desktop/website**: Official website and tutorials (Docusaurus)
4. **tikmatrix-android**: Android application for device communication
5. **tikmatrix-admin-pro**: Admin backend and API service (Vue + Cloudflare Worker)

## Common Tasks

### Adding a New Feature

1. Identify affected components in `/src/components`
2. Update i18n files in `/src/i18n` for all three languages
3. Add any new API calls in `/src/api`
4. Update Tauri commands in `/src-tauri/src` if backend changes needed
5. Test with `npm run dev`
6. Lint with `npm run lint:fix`

### Fixing Bugs

1. Reproduce the issue in development mode
2. Make minimal changes to fix the issue
3. Ensure no other modules are affected
4. Test thoroughly in dev mode
5. Run linter before committing

### UI Changes

1. Use existing daisyUI components when possible
2. Follow Tailwind CSS utility-first approach
3. Ensure responsive design works on different screen sizes
4. Maintain consistent styling with rest of application
5. Test theme variations if applicable

## Security Considerations

- Never hardcode API keys or secrets
- Validate all user inputs
- Sanitize data before displaying (especially user-generated content)
- Use secure communication for API calls
- Follow Tauri security best practices

## Performance Guidelines

- Lazy load components when appropriate
- Optimize images and assets
- Minimize bundle size
- Use efficient data structures
- Avoid unnecessary re-renders in Vue components
- Use virtual scrolling for large lists

## Git Workflow

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Don't commit build artifacts or `node_modules`
- Use `.gitignore` appropriately

## Key Dependencies

- **@tauri-apps/api**: Tauri JavaScript API
- **vue**: Vue 3 framework
- **vue-i18n**: Internationalization
- **daisyui**: UI component library
- **tailwindcss**: Utility-first CSS framework

## Support and Resources

- Official Website: https://tikmatrix.com
- Documentation: https://tikmatrix.com/docs/intro
- Telegram: https://t.me/tikmatrix_agent_bot
- YouTube: https://www.youtube.com/@tikmatrix
