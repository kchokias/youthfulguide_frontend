import { NavItem } from "./nav-item.model";

export const navbarData: NavItem[] = [
  {
    routeLink: 'find-a-guide',
    icon: 'fa-solid fa-magnifying-glass',
    label: 'Find a Guide',
    visibleFor: ['visitor']
  },
  {
    routeLink: 'bookings',
    icon: 'fa-solid fa-book',
    label: 'Bookings',
    visibleFor: ['guide']
  },
  {
    routeLink: 'my-bookings',
    icon: 'fa-solid fa-book',
    label: 'My Bookings',
    visibleFor: ['visitor']
  },
  {
    routeLink: 'availability',
    icon: 'fa-solid fa-calendar',
    label: 'Availability',
    visibleFor: ['guide']
  },
  {
    routeLink: 'profile-preview',
    icon: 'fa-solid fa-users-rectangle',
    label: 'Profile Preview',
    visibleFor: ['guide']
  },
  {
    routeLink: 'profile-settings',
    icon: 'fa-solid fa-id-card',
    label: 'Profile Settings',
    visibleFor: ['guide', 'visitor']
  },
  {
    routeLink: 'faq',
    icon: 'fa solid fa-question',
    label: 'FAQ',
    visibleFor: ['guide']
  },
  {
    routeLink: 'help',
    icon: 'fa solid fa-question',
    label: 'Help',
    visibleFor: ['visitor']
  },
  {
    routeLink: 'logout',
    icon: 'bi bi-box-arrow-left',
    label: 'Sign Out',
    visibleFor: ['guide', 'visitor']
  }
];
