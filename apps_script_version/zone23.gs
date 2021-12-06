function intraday(raw) {
// input: 3 columns, [user, price, volume]

  let bid_raw = []
  let offer_raw = []

  for (let i = 0; i < raw.length; i++) {
    if (raw[i][2] >= 0) {
      bid_raw.push([raw[i][1],raw[i][2],raw[i][0]])
    } else {
      offer_raw.push([raw[i][1],Math.abs(raw[i][2]),raw[i][0]])
    }
  }

  // Sorting
  bid = bid_raw.sort().reverse()
  offer = offer_raw.sort()

  // Separate price and volumn column
  bid_p = bid.map(function(value, index) {return value[0]})
  bid_v = bid.map(function(value, index) {return value[1]})
  bid_u = bid.map(function(value, index) {return value[2]})
  offer_p = offer.map(function(value, index) {return value[0]})
  offer_v = offer.map(function(value, index) {return value[1]})
  offer_u = offer.map(function(value, index) {return value[2]})

  // Initial accumulated volume
  acc_bid_v   = 0
  acc_offer_v = 0

  if (sum(bid_v) >= Math.abs(sum(offer_v))) {
    z2_final_v = sum(offer_v)
  } else {
    z2_final_v = sum(bid_v)
  }
        
  return arrange_result_z23(z2_final_v, bid_v, bid_u, offer_v, offer_u)
    
}
