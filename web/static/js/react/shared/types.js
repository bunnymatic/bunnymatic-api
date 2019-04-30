import PropType from "prop-types";

export const ImageType = PropType.shape({
  dimensions: PropType.string,
  file: PropType.string,
  id: PropType.number,
  inserted_at: PropType.string,
  medium: PropType.string,
  price: PropType.string,
  title: PropType.string,
  year: PropType.string,
});