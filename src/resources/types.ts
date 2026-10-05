export interface ResourceObject {
  type: string;
  id: number | string;
  attributes: Record<string, unknown>;
  links: {
    self: string;
  };
}
