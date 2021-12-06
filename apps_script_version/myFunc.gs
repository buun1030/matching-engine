function arrange_result_z1(mcp, final_v, bid_v, bid_u, offer_v, offer_u) {
  bid   = matching_result_z1(mcp, final_v, bid_v, bid_u)
  offer = matching_result_z1(mcp, final_v, offer_v, offer_u)
  for (let i = 0; i < offer.length; i++) {
    bid.push([offer[i][0], offer[i][1], -offer[i][2]])
  }
  return bid.sort()
}

function matching_result_z1(mcp, final_v, v, u) {
  let output = []
  let acc_v = 0
  let over = 0
  for (let i = 0; i < v.length; i++) {
    acc_v = acc_v + v[i]
    if (acc_v > final_v && over == 0) {
      output.push([u[i], mcp, final_v - acc_v + v[i]])
      over = 1
    } else if (over == 1) {
      output.push([u[i], mcp, 0])
    } else {
      output.push([u[i], mcp, v[i]])
    }
  }
  return output
}

function arrange_result_z23(z2_final_v, bid_v, bid_u, offer_v, offer_u) {
  bid   = matching_result_z23(z2_final_v, bid_v, bid_u)
  offer = matching_result_z23(z2_final_v, offer_v, offer_u)
  for (let i = 0; i < offer.length; i++) {
    bid.push([offer[i][0], -offer[i][1], -offer[i][2]])
  }
  return bid.sort()
}

function matching_result_z23(z2_final_v, v, u) {
  let output = []
  let acc_v = 0
  let over = 0
  for (let i = 0; i < v.length; i++) {
    acc_v = acc_v + v[i]
    if (acc_v > z2_final_v && over == 0) {
      output.push([u[i], z2_final_v - acc_v + v[i], acc_v - z2_final_v])
      over = 1
    } else if (over == 1) {
      output.push([u[i], 0, v[i]])
    } else {
      output.push([u[i], v[i], 0])
    }
  }
  return output
}

function sum(input) {
  let output = 0
  for (let i = 0; i < input.length; i++) {
    output += Number(input[i])
  }
  return output
}

function sumifpos(input) {
  let output = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] >= 0) {
      output += Number(input[i])
    }
  }
  return output
}

function sumifneg(input) {
  let output = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] < 0) {
      output += Number(input[i])
    }
  }
  return output
}
