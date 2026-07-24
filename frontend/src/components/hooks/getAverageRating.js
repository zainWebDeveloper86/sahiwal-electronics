// Computes an average rating from a product's reviews array.
// Falls back to 0 if there are no reviews yet. Used anywhere a product's
// star rating needs to be shown, so the calculation logic only lives here
// once — ProductCard, ProductDetailsCard, ProductDetails, ProductDetailsInfo
// all call this instead of each doing their own reduce().
export const getAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  return total / reviews.length;
};
