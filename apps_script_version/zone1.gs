function matching_engine(raw) {
// input: 3 columns, [user, price, volume]

  let bid_raw = []
  let offer_raw = []

  for (let i = 0; i < raw.length; i++) {
    if (raw[i][2] > 0) {
      bid_raw.push([raw[i][1],raw[i][2],raw[i][0]])
    } else if (raw[i][2] == 0) {
        bid_raw.push([0,0,raw[i][0]])
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

  // Check whether max(bid_p) < min(offer_p) case
  if (bid_p[0] < offer_p[0]) {return "No MCP"}

  // Check whether max(Bid) = min(Offer) case
  if (bid_p[0] == offer_p[0]) {
    mcp = bid_p[0]
    final_v = Math.min(bid_v[0], offer_v[0])

    return arrange_result_z1(mcp, final_v, bid_v, bid_u, offer_v, offer_u)
  }

  // Check whether run out of order case
  if (sum(bid_v) < sum(offer_v)) {
    final_v = sum(bid_v)
    // find index
    acc_offer_v = 0
    idx = -1
    last_idx = 0
    while (acc_offer_v < final_v) {
      idx += 1
      acc_offer_v += offer_v[idx]
    }
    if (bid_p[bid_p.length-1] >= offer_p[idx]) {
      mcp = (bid_p[bid_p.length-1] + offer_p[idx]) / 2

      return arrange_result_z1(mcp, final_v, bid_v, bid_u, offer_v, offer_u)
    } 
  } else {
    final_v = sum(offer_v)
    // find index
    acc_bid_v = 0
    idx = -1
    last_idx = 0
    while (acc_bid_v < final_v) {
      idx += 1
      acc_bid_v += bid_v[idx]
    }
    if (bid_p[idx] >= offer_p[offer_p.length-1]) {
      mcp = (bid_p[idx] + offer_p[offer_p.length-1]) / 2

      return arrange_result_z1(mcp, final_v, bid_v, bid_u, offer_v, offer_u)
    } 
  }

  // Initial accumulated volume
  acc_bid_v   = 0
  acc_offer_v_mi1 = 0
  acc_offer_v_mi0 = 0

  for (let m = 0; m < bid.length; m++) {
    
    // Accumulate bid volume
    acc_bid_v   = acc_bid_v + bid_v[m]

    for (let n = 0; n < offer.length; n++) {
      // Accumulate offer volume
      if (n == 0) {
        acc_offer_v_mi1 = offer_v[0]
        acc_offer_v_mi0 = offer_v[0]
      } else if (n == 1) {
        acc_offer_v_mi1 = offer_v[0]
        acc_offer_v_mi0 = offer_v[0] + offer_v[1]
      } else {
        acc_offer_v_mi1 = acc_offer_v_mi0
        acc_offer_v_mi0 = acc_offer_v_mi0 + offer_v[n]
      }

      // To avoid error
      if (n < 2) { n_mi1 = 0 } else { n_mi1 = n-1 }

      // Check wheather bid price already cross offer price
      if (bid_p[m] > offer_p[n]) {
        if (bid_p[m+1] <= offer_p[n]) {
          if (acc_bid_v > acc_offer_v_mi0) {
            continue
          } else if (acc_bid_v == acc_offer_v_mi0) {
            mcp = (bid_p[m] + offer_p[n]) / 2
            final_v = acc_bid_v
          } else {
            if (bid_p[m+1] == offer_p[n]) {
              mcp = offer_p[n]
              final_v = Math.min(acc_bid_v + bid_v[m+1], acc_offer_v_mi0)
            } else {
              if (acc_bid_v > acc_offer_v_mi1) {
                mcp = (bid_p[m] + offer_p[n]) / 2
                final_v = acc_bid_v
              } else if (acc_bid_v == acc_offer_v_mi1) {
                mcp = (bid_p[m] + offer_p[n_mi1]) / 2
                final_v = acc_bid_v
              } else if (n == 0) {
                mcp = (bid_p[m] + offer_p[n]) / 2
                final_v = acc_bid_v
              } else {
                continue
              } 
            }
          }
        } else {
          continue
        }
      } else if (bid_p[m] == offer_p[n]) {
        if (acc_bid_v > acc_offer_v_mi0) {
          mcp = bid_p[m]
          final_v = acc_offer_v_mi0
        } else {
          continue
        }
      } else {
        if (bid_p[m] >= offer_p[n_mi1]) {
          if (acc_bid_v > acc_offer_v_mi1) {
            if (bid_p[m] == offer_p[n_mi1]) {
              mcp = bid_p[m]
              final_v = Math.min(acc_bid_v, acc_offer_v_mi1)
            } else {
                mcp = (bid_p[m] + offer_p[n_mi1]) / 2
                final_v = acc_offer_v_mi1
            }
          } else if (acc_bid_v == acc_offer_v_mi1) {
            mcp = (bid_p[m] + offer_p[n_mi1]) / 2
            final_v = acc_bid_v
          } else {
            continue
          }
        } else {
          continue
        }
      }

      return arrange_result_z1(mcp, final_v, bid_v, bid_u, offer_v, offer_u)
    }
  }
  return "No MCP"
}
