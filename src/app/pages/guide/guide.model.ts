export interface MediaItem {
  id: number;
  media_data: string;
  created_at: string;
}

export class GetGuidesFilter {
  currentPage: number;
  take?: number;
  skip?: number;

  constructor() {
    this.currentPage = 1;
  }

  public resetPage(_pageSize: number): number {
    this.currentPage = 1;
    return (this.currentPage * _pageSize) - _pageSize;
  }

  public goToNextPage(_pageSize: number): number {
    this.currentPage ++;
    return (this.currentPage * _pageSize) - _pageSize;
  }
}
