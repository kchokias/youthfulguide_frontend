export interface NavItem {
  routeLink: string;
  icon: string;
  label: string;
  visibleFor: string[];
  external?: boolean;
  targetBlank?: boolean;
}
