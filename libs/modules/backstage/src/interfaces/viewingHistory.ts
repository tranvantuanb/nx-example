export interface ViewingHistoryListRequest {
  per_page?: number;
  contact_id?: number;
}

export interface ViewingHistoryCar {
  listing_id: number;
  listing_slug: string;
  listing_detail_url: string;
  price: number;
  installment: number;
  title: string;
  make: string;
  model: string;
  submodel: string;
  mileage: number;
  photos: string[];
  number_of_owners: number;
  objectID: number;
  original_registration_date: string;
  promo_label: string;
  transmission: string;
  location: string;
  carplate_no: string;
  carplate_sell_with_without: string;
  registration: {
    no_of_previous_owners: number;
    original_reg_date: string;
    registration_card: string;
    registration_type: string;
  };
}
