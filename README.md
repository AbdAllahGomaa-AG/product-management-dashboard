## 📋 Development Guidelines

### Code Style

- **ESLint**: Enforced via `eslint.config.js`
- **Prettier**: Code formatting via `.prettierrc`
- **TypeScript Strict Mode**: Enabled for type safety
- **Angular Style Guide**: Following official Angular conventions

### Git Workflow

- **Branch Naming**: `feature/`, `bugfix/`, `hotfix/`
- **Commit Messages**: Conventional commits format
- **Pull Requests**: Required for all changes
- **Code Review**: Mandatory before merging

### Testing Strategy

- **Unit Tests**: Jasmine + Karma for components/services
- **Integration Tests**: Testing component interactions
- **E2E Tests**: Critical user journeys
- **Coverage Target**: >80% code coverage

## 📄 License

[Add your license information here]

## 👥 Contributors

[Add contributor information here]

---

**Built with ❤️ using Angular 15, NgRx, and modern web technologies.**lint

# or

ng lint

````

7. **Watch mode for development**
```bash
npm run watch
# or
ng build --watch --configuration development
````

### Environment Configuration

The application uses environment files for configuration:

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

**Current Configuration:**

```typescript
export const environment = {
  production: true,
  API_URL: 'https://fakestoreapi.com'
}
```

To modify the API endpoint or add new environment variables:

1. Update the appropriate environment file
2. Add the new property to the environment interface if needed
3. Import and use in your services: `import { environment } from 'src/environments/environment';`

## 🏗️ Architecture Overview

### Project Structure

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── guards/             # Route guards
│   │   ├── interceptors/       # HTTP interceptors
│   │   ├── interface/          # TypeScript interfaces
│   │   └── services/           # Core services
│   ├── features/               # Feature modules
│   │   ├── cart/              # Shopping cart feature
│   │   ├── favorites/         # Favorites feature
│   │   ├── hero/              # Hero section
│   │   └── products/          # Product catalog
│   ├── shared/                # Shared components & modules
│   │   ├── components/        # Reusable components
│   │   ├── icons/             # Icon components
│   │   ├── pipes/             # Custom pipes
│   │   └── shared.module.ts   # Shared module
│   ├── store/                 # NgRx state management
│   │   ├── cart/              # Cart state
│   │   ├── favorites/         # Favorites state
│   │   ├── products/          # Products state
│   │   ├── product-detail/    # Product detail state
│   │   └── meta-reducers/     # Meta reducers
│   └── app.module.ts          # Root module
├── assets/
│   ├── i18n/                  # Translation files
│   └── images/                # Static images
└── environments/              # Environment configurations
```

### Folder & File Conventions

- **Components**: PascalCase with `.component.ts`, `.component.html`, `.component.scss`
- **Services**: PascalCase with `.service.ts`
- **Interfaces**: PascalCase with `.model.ts` or `.interface.ts`
- **Modules**: PascalCase with `.module.ts`
- **Store**: kebab-case folders with actions, reducers, effects, selectors
- **Feature modules**: Self-contained with their own routing and components

### State Management Approach

The application uses **NgRx** for state management with the following architecture:

#### Store Structure

```typescript
interface AppState {
  products: ProductsState // Product catalog & filtering
  productDetail: ProductDetailState // Individual product details
  cart: CartState // Shopping cart
  favorites: FavoritesState // User favorites
}
```

#### NgRx Implementation

- **Actions**: Define all possible state changes
- **Reducers**: Pure functions that handle state transitions
- **Effects**: Handle side effects (API calls, localStorage)
- **Selectors**: Provide memoized state selections
- **Meta-reducers**: Handle localStorage persistence for cart and favorites

#### Data Flow

```
API → Effects → Actions → Reducers → Selectors → Components
```

**Example Flow:**

1. Component dispatches `loadProducts()` action
2. Effect intercepts action and calls ProductService
3. Effect dispatches `loadProductsSuccess()` with data
4. Reducer updates state with new products
5. Selector provides memoized data to component
6. Component re-renders with new data

### Core Services

| Service               | Purpose                        |
| --------------------- | ------------------------------ |
| `ProductService`      | API communication for products |
| `CacheService`        | HTTP response caching          |
| `ErrorHandlerService` | Global error handling          |
| `NotificationService` | User notifications             |
| `TranslationService`  | i18n management                |

## 🌍 Internationalization (i18n)

### Implementation

The application uses **@ngx-translate** for internationalization with the following setup:

#### Translation Structure

```
src/assets/i18n/
├── en.json    # English translations
└── ar.json    # Arabic translations
```

#### Translation Files Format

```json
{
  "NAV": {
    "HOME": "Home",
    "PRODUCTS": "Products",
    "CART": "Cart",
    "FAVORITES": "Favorites"
  },
  "BUTTON": {
    "ADD_TO_CART": "Add to cart",
    "SWITCH_LANG": "Switch Language"
  }
}
```

#### Usage in Components

```typescript
// In component
constructor(private translate: TranslateService) {}

// Switch language
switchLanguage(lang: string) {
  this.translate.use(lang);
}

// In template
<h1>{{ 'NAV.HOME' | translate }}</h1>
```

#### Adding a New Language

1. **Create translation file**

   ```bash
   # Create new file: src/assets/i18n/[language-code].json
   touch src/assets/i18n/es.json
   ```

2. **Add translations**

   ```json
   {
     "NAV": {
       "HOME": "Inicio",
       "PRODUCTS": "Productos"
     }
   }
   ```

3. **Update language selector** (if implemented)

   ```typescript
   const languages = ['en', 'ar', 'es']
   ```

4. **Set default language** (optional)
   ```typescript
   this.translate.setDefaultLang('en')
   ```

## ⚡ Performance Optimizations

### Implemented Optimizations

| Optimization                  | Implementation                           | Benefit                                      |
| ----------------------------- | ---------------------------------------- | -------------------------------------------- |
| **OnPush Change Detection**   | `ChangeDetectionStrategy.OnPush`         | Reduces unnecessary change detection cycles  |
| **TrackBy Functions**         | Custom trackBy in `*ngFor` loops         | Prevents DOM recreation on list updates      |
| **Lazy Loading**              | Route-based module lazy loading          | Reduces initial bundle size                  |
| **HTTP Caching**              | Custom CacheService with TTL             | Reduces API calls and improves response time |
| **NgRx Selectors**            | Memoized selectors with `createSelector` | Prevents unnecessary state subscriptions     |
| **Virtual Scrolling**         | Angular CDK ScrollingModule              | Handles large lists efficiently              |
| **FontAwesome Tree Shaking**  | Import specific icons only               | Reduces bundle size                          |
| **Tailwind CSS**              | Utility-first CSS framework              | Smaller CSS bundle, better performance       |
| **Local Storage Persistence** | Meta-reducers for cart/favorites         | Maintains state across sessions              |

### Performance Monitoring

**Bundle Analysis:**

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/product-management-dashboard/stats.json
```

**Lighthouse Metrics:**

- Target: >90 Performance Score
- Target: >90 Accessibility Score
- Target: >90 Best Practices Score

### Memory Management

- **Unsubscribe Strategy**: Using `takeUntil` pattern in effects
- **Weak References**: Proper cleanup of subscriptions
- **OnDestroy**: Implement cleanup in components

## 🔮 Possible Improvements

### Short-term Enhancements

#### 1. Progressive Web App (PWA) Support

```bash
ng add @angular/pwa
```

- **Benefits**: Offline functionality, app-like experience, push notifications
- **Implementation**: Service workers, manifest file, caching strategies

#### 2. Server-Side Rendering (SSR)

```bash
ng add @nguniversal/express-engine
```

- **Benefits**: Better SEO, faster initial load, improved Core Web Vitals
- **Implementation**: Angular Universal, Express server

#### 3. Advanced Caching Strategies

- **HTTP Cache Headers**: Implement proper cache-control headers
- **Service Worker Caching**: Cache API responses and static assets
- **IndexedDB**: Store large datasets locally
- **Background Sync**: Sync data when connection is restored

#### 4. Enhanced Error Handling

- **Global Error Boundary**: Catch and handle all unhandled errors
- **Retry Mechanisms**: Automatic retry for failed requests
- **Error Reporting**: Integration with Sentry or similar service
- **User-Friendly Messages**: Better error messaging for users

### Medium-term Enhancements

#### 5. Accessibility Improvements

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG 2.1 AA compliance
- **Focus Management**: Proper focus handling in modals/dialogs

#### 6. Advanced State Management

- **NgRx Data**: Simplify CRUD operations
- **NgRx Component Store**: Component-level state management
- **State Normalization**: Better data structure for complex relationships
- **Optimistic Updates**: Immediate UI updates with rollback capability

#### 7. Testing Infrastructure

- **E2E Testing**: Cypress or Playwright integration
- **Visual Regression**: Screenshot testing
- **Performance Testing**: Bundle size monitoring
- **Accessibility Testing**: Automated a11y testing

### Long-term Enhancements

#### 8. Micro-Frontend Architecture

- **Module Federation**: Split into independent deployable modules
- **Shared Libraries**: Common components and utilities
- **Independent Deployment**: Deploy features independently

#### 9. Advanced Analytics

- **User Behavior Tracking**: Google Analytics 4 integration
- **Performance Monitoring**: Real User Monitoring (RUM)
- **A/B Testing**: Feature flag implementation
- **Error Tracking**: Comprehensive error analytics

#### 10. CI/CD Pipeline

- **Automated Testing**: Unit, integration, and E2E tests
- **Code Quality Gates**: ESLint, Prettier, SonarQube
- **Automated Deployment**: GitHub Actions or GitLab CI
- **Environment Management**: Staging, production environments

#### 11. Advanced Features

- **Real-time Updates**: WebSocket integration
- **Advanced Search**: Elasticsearch integration
- **Recommendation Engine**: AI-powered product recommendations
- **Payment Integration**: Stripe/PayPal integration

## 📋 Development Guidelines

### Code Style

- **ESLint**: Enforced via `eslint.config.js`
- **Prettier**: Code formatting via `.prettierrc`
- **TypeScript Strict Mode**: Enabled for type safety
- **Angular Style Guide**: Following official Angular conventions

### Git Workflow

- **Branch Naming**: `feature/`, `bugfix/`, `hotfix/`
- **Commit Messages**: Conventional commits format
- **Pull Requests**: Required for all changes
- **Code Review**: Mandatory before merging

### Testing Strategy

- **Unit Tests**: Jasmine + Karma for components/services
- **Integration Tests**: Testing component interactions
- **E2E Tests**: Critical user journeys
- **Coverage Target**: >80% code coverage

## 📄 License

[Add your license information here]

## 👥 Contributors

[Add contributor information here]

---

**Built with ❤️ using Angular 15, NgRx, and modern web technologies.**
