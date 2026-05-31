export interface Banner {
  id: string;
  title: string;
  imageBase64: string;
  createdAt: string;
  updatedAt: string;
}

export type BannersDB = {
  data: Banner[];
};

export type CreateBannerDto = {
  title: string;
  imageBase64: string;
};

export type UpdateBannerDto = {
  title?: string;
  imageBase64?: string;
};
