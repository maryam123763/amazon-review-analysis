// Yeh simple dummy function hai. 
// Tum isme apna model ya bias detection logic later add kar sakti ho.

export function classifyBias(review) {
    // Example: agar review text me "fake", "scam" aata hai to biased
    const text = (review.reviewText || "").toLowerCase();
    
    if (text.includes("fake") || text.includes("scam") || text.includes("bad quality")) {
      return "biased";
    }
  
    return "unbiased";
  }
  