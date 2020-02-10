import PropType from "prop-types";

export const NumberOrStringType = PropType.oneOfType([PropType.number,PropType.string])
export const ImageType = PropType.shape({
  dimensions: PropType.string,
  file: PropType.string,
  id: NumberOrStringType,
  inserted_at: PropType.string,
  medium: PropType.string,
  price: PropType.string,
  title: PropType.string,
  year: NumberOrStringType,
});
