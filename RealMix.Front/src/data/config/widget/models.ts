export interface WidgetModel {
  id: number;
  name: string;
  type: number;
  created: Date;
  updated: Date;
}

export interface WidgetModelEdit {
  id: number;
  name: string;
  type: number;
  parameters: string;
}
