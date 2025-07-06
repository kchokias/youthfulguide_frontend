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
    icon: 'bi bi-book',
    label: 'Bookings',
    visibleFor: ['guide']
  },
  {
    routeLink: 'my-bookings',
    icon: 'bi bi-book',
    label: 'My Bookings',
    visibleFor: ['visitor']
  },
  {
    routeLink: 'availability',
    icon: 'bi bi-calendar-week-fill',
    label: 'Availability',
    visibleFor: ['guide']
  },
  {
    routeLink: 'profile-settings',
    icon: 'bi bi-file-person',
    label: 'Edit Profile',
    visibleFor: ['guide']
  },
  {
    routeLink: 'visitor-preview',
    icon: 'bi bi-file-person',
    label: 'Edit Profile',
    visibleFor: ['visitor']
  },
  {
    routeLink: 'profile-preview',
    icon: 'bi bi-eye',
    label: 'Profile Preview',
    visibleFor: ['guide']
  },
  {
    routeLink: 'faq',
    icon: 'bi bi-signpost-2-fill',
    label: 'FAQ',
    visibleFor: ['guide']
  },
  {
    routeLink: 'help',
    icon: 'bi bi-signpost-2-fill',
    label: 'Help',
    visibleFor: ['visitor']
  },
  {
    routeLink: 'https://youthfulguides.eu/',
    icon: 'bi bi-info-lg',
    label: 'More Information',
    visibleFor: ['guide', 'visitor'],
    external: true,
    targetBlank: true
  },
  {
    routeLink: 'logout',
    icon: 'bi bi-box-arrow-left',
    label: 'Sign Out',
    visibleFor: ['guide', 'visitor']
  }
];
