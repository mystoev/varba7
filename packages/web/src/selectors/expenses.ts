export const getByCategory = (data) => {
  if (data == null) {
    return [];
  }

  const categories = {};
  data.forEach((entry) => {
    entry.tags.forEach((tag) => {
      if (categories[tag] == null) {
        categories[tag] = entry.amount;
      } else {
        categories[tag] += entry.amount;
      }
    });
  });

  const allCategories = Object.keys(categories)
    .filter((category) => category != "")
    .map((categoryKey) => {
      return {
        category: categoryKey,
        amount: +categories[categoryKey].toFixed(2),
      };
    });

  allCategories.sort((a, b) =>
    a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0
  );

  return allCategories;
};

export const getLastMonthCategoryData = (data) => {
  if (data == null) {
    return [];
  }

  const categories = {};
  const lastMonth = new Date().getMonth() - 1;

  data.forEach((entry) => {
    const month = new Date(entry.date).getMonth();
    if (lastMonth != month) {
      return;
    }

    entry.tags.forEach((tag) => {
      if (categories[tag] == null) {
        categories[tag] = entry.amount;
      } else {
        categories[tag] += entry.amount;
      }
    });
  });

  const allCategories = Object.keys(categories)
    .filter((category) => category != "")
    .map((categoryKey) => {
      return {
        category: categoryKey,
        amount: +categories[categoryKey].toFixed(2),
      };
    });

  allCategories.sort((a, b) =>
    a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0
  );

  return allCategories;
};
