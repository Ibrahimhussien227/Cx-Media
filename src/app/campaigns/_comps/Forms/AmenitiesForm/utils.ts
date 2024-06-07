// function to add isActive property to all the Amenities
export const AddProperty = (
  amenities: { display: string }[],
  campaignAmenities: string[]
) => {
  const updated = amenities?.map((amenity) => {
    const matchingItem = campaignAmenities.find(
      (elem) => elem === amenity.display
    );
    if (matchingItem) {
      return { ...amenity, isActive: true };
    } else {
      return { ...amenity, isActive: false };
    }
  });

  return updated;
};
