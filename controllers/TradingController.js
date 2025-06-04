exports.renderTradingPage = (req, res) => {
  // Example data, replace with real data from DB if needed
  const listings = [
    { id: 1, colorClass: 'bg-red-300' },
    { id: 2, colorClass: 'bg-cyan-300' },
    { id: 3, colorClass: 'bg-yellow-300' }
  ];
  res.render("tradingPage", { title: "Trading Page", listings });
};




