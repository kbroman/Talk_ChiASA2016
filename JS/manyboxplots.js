// Generated by CoffeeScript 1.10.0
var draw_manyboxplots, stop_manyboxplots;

draw_manyboxplots = function(data) {
  var Baxis, BaxisData, Laxis, LaxisData, axisFormat1, axisFormat2, bgcolor, br2, clickStatus, colors, curves, d, darkGray, fix4hist, grp4BkgdHist, h, hist, histColors, histline, i, indRect, indRectGrp, index, j, k, l, labelcolor, len, len1, lightGray, low, lowBaxis, lowBaxisData, lowsvg, lowxScale, lowyScale, m, maxCount, midQuant, n, nQuant, pad, quline, randomInd, ref, ref1, ref2, rightAxis, specialrects, svg, tip, titlecolor, w, xScale, yScale;
  bgcolor = d3.rgb(24, 24, 24);
  labelcolor = "white";
  titlecolor = "Wheat";
  lightGray = d3.rgb(200, 200, 200);
  darkGray = d3.rgb(170, 170, 170);
  w = 1000;
  h = 300;
  pad = {
    left: 60,
    top: 20,
    right: 40,
    bottom: 40
  };
  br2 = [];
  ref = data.br;
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    br2.push(i);
    br2.push(i);
  }
  fix4hist = function(d) {
    var l, len1, x;
    x = [0];
    for (l = 0, len1 = d.length; l < len1; l++) {
      i = d[l];
      x.push(i);
      x.push(i);
    }
    x.push(0);
    return x;
  };
  for (i in data.counts) {
    data.counts[i] = fix4hist(data.counts[i]);
  }
  nQuant = data.qu.length;
  midQuant = (nQuant + 1) / 2 - 1;
  xScale = d3.scale.linear().domain([0, data.ind.length - 1]).range([pad.left, w - pad.right]);
  yScale = d3.scale.linear().domain([-1.1, 1.1]).range([h - pad.bottom, pad.top]);
  axisFormat2 = d3.format(".2f");
  axisFormat1 = d3.format(".1f");
  quline = function(j) {
    return d3.svg.line().x(function(d, i) {
      return xScale(i);
    }).y(function(d) {
      return yScale(data.quant[j][d]);
    });
  };
  svg = d3.select("div#manyboxplots").append("svg").attr("width", w).attr("height", h);
  svg.append("rect").attr("x", pad.left).attr("y", pad.top).attr("height", h - pad.top - pad.bottom).attr("width", w - pad.left - pad.right).attr("stroke", "none").attr("fill", lightGray);
  LaxisData = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1];
  Baxis = svg.append("g");
  Laxis = svg.append("g");
  Laxis.append("g").selectAll("empty").data(LaxisData).enter().append("line").attr("class", "line").attr("class", "axis").attr("x1", pad.left).attr("x2", w - pad.right).attr("y1", function(d) {
    return yScale(d);
  }).attr("y2", function(d) {
    return yScale(d);
  }).attr("stroke", "white");
  Laxis.append("g").selectAll("empty").data(LaxisData).enter().append("text").attr("class", "axis").text(function(d) {
    return axisFormat2(d);
  }).attr("x", pad.left * 0.9).attr("y", function(d) {
    return yScale(d);
  }).attr("dominant-baseline", "middle").attr("text-anchor", "end").attr("fill", labelcolor);
  BaxisData = [50, 100, 150, 200, 250, 300, 350, 400, 450];
  Baxis.append("g").selectAll("empty").data(BaxisData).enter().append("line").attr("class", "line").attr("class", "axis").attr("y1", pad.top).attr("y2", h - pad.bottom).attr("x1", function(d) {
    return xScale(d);
  }).attr("x2", function(d) {
    return xScale(d);
  }).attr("stroke", darkGray);
  Baxis.append("g").selectAll("empty").data(BaxisData).enter().append("text").attr("class", "axis").text(function(d) {
    return d;
  }).attr("y", h - pad.bottom * 0.75).attr("x", function(d) {
    return xScale(d);
  }).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("fill", labelcolor);
  colors = ["black", "DarkGreen", "DarkOrchid", "Crimson", "Navy"];
  for (j = l = 3; l >= 0; j = --l) {
    colors.push(colors[j]);
  }
  curves = svg.append("g");
  for (j = m = 0, ref1 = nQuant; 0 <= ref1 ? m < ref1 : m > ref1; j = 0 <= ref1 ? ++m : --m) {
    curves.append("path").datum(data.ind).attr("d", quline(j)).attr("class", "line").attr("stroke", colors[j]);
  }
  clickStatus = {};
  index = {};
  specialrects = svg.append("g");
  ref2 = data.ind;
  for (i = n = 0, len1 = ref2.length; n < len1; i = ++n) {
    d = ref2[i];
    clickStatus[d] = 0;
    specialrects.append("rect").attr("x", xScale(i - 0.5)).attr("y", yScale(data.quant[nQuant - 1][d])).attr("width", 2).attr("id", d).attr("height", yScale(data.quant[0][d]) - yScale(data.quant[nQuant - 1][d])).attr("opacity", 0).attr("stroke", "none");
  }
  indRectGrp = svg.append("g");
  indRect = indRectGrp.selectAll("empty").data(data.ind).enter().append("rect").attr("x", function(d, i) {
    return xScale(i - 0.5);
  }).attr("y", function(d) {
    return yScale(data.quant[nQuant - 1][d]);
  }).attr("width", 2).attr("height", function(d) {
    return yScale(data.quant[0][d]) - yScale(data.quant[nQuant - 1][d]);
  }).attr("fill", "purple").attr("stroke", "none").attr("opacity", "0");
  rightAxis = svg.append("g").attr("id", "rightAxis");
  rightAxis.append("rect").attr("x", w - pad.right * 0.9).attr("y", yScale(0.7)).attr("height", yScale(-0.7) - yScale(0.7)).attr("width", pad.right * 0.9).attr("stroke", "none").attr("fill", lightGray);
  rightAxis.selectAll("empty").data(data.qu).enter().append("text").attr("class", "qu").text(function(d) {
    return (d * 100) + "%";
  }).attr("x", w - pad.right * 0.1).attr("y", function(d, i) {
    return yScale(((i + 0.5) / nQuant - 0.5) * 1.3);
  }).attr("fill", function(d, i) {
    return colors[i];
  }).attr("text-anchor", "end").attr("dominant-baseline", "middle");
  svg.append("rect").attr("x", 0).attr("y", 0).attr("width", w).attr("height", pad.top).attr("stroke", "none").attr("fill", bgcolor);
  svg.append("rect").attr("x", pad.left).attr("y", pad.top).attr("height", h - pad.top - pad.bottom).attr("width", w - pad.left - pad.right).attr("stroke", bgcolor).attr("stroke-width", 2).attr("fill", "none");
  lowsvg = d3.select("div#manyboxplots").append("svg").attr("height", h).attr("width", w);
  low = data.br[0] - (data.br[1] - data.br[0]);
  lowxScale = d3.scale.linear().domain([-1.25, -low]).range([pad.left, w - pad.right]);
  maxCount = 0;
  for (i in data.counts) {
    for (j in data.counts[i]) {
      if (data.counts[i][j] > maxCount) {
        maxCount = data.counts[i][j];
      }
    }
  }
  maxCount *= 0.5;
  lowyScale = d3.scale.linear().domain([0, maxCount + 0.5]).range([h - pad.bottom, pad.top]);
  lowsvg.append("rect").attr("x", pad.left).attr("y", pad.top).attr("height", h - pad.top - pad.bottom).attr("width", w - pad.left - pad.right).attr("stroke", "none").attr("fill", lightGray);
  lowBaxisData = [-1, -0.5, 0, 0.5, 1, 1.5, 2];
  lowBaxis = lowsvg.append("g");
  lowBaxis.append("g").selectAll("empty").data(lowBaxisData).enter().append("line").attr("class", "line").attr("class", "axis").attr("y1", pad.top).attr("y2", h - pad.bottom).attr("x1", function(d) {
    return lowxScale(d);
  }).attr("x2", function(d) {
    return lowxScale(d);
  }).attr("stroke", function(d) {
    if (d !== 0) {
      return darkGray;
    }
    return "rgb(255,220,255)";
  });
  lowBaxis.append("g").selectAll("empty").data(lowBaxisData).enter().append("text").attr("class", "axis").text(function(d) {
    return axisFormat1(d);
  }).attr("y", h - pad.bottom * 0.75).attr("x", function(d) {
    return lowxScale(d);
  }).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("fill", labelcolor);
  grp4BkgdHist = lowsvg.append("g");
  histline = d3.svg.line().x(function(d, i) {
    return lowxScale(br2[i]);
  }).y(function(d) {
    return lowyScale(d);
  });
  randomInd = data.ind[Math.floor(Math.random() * data.ind.length)];
  hist = lowsvg.append("path").datum(data.counts[randomInd]).attr("d", histline).attr("id", "histline").attr("fill", "none").attr("stroke", "purple").attr("stroke-width", "2");
  histColors = ["Crimson", "DarkGreen", "MediumVioletRed", "Navy"];
  lowsvg.append("text").datum(randomInd).attr("x", lowxScale(-1.75)).attr("y", pad.top * 2).text(function(d) {
    return d;
  }).attr("id", "histtitle").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("fill", labelcolor);
  tip = d3.svg.tip().orient("right").padding(3).text(function(z) {
    return z;
  }).attr("class", "d3-tip").attr("id", "d3tip");
  indRect.on("mouseover", function(d) {
    d3.select(this).attr("opacity", "1");
    d3.select("#histline").datum(data.counts[d]).attr("d", histline);
    d3.select("#histtitle").datum(d).text(function(d) {
      return d;
    });
    return tip.call(this, d);
  }).on("mouseout", function(d) {
    d3.select(this).attr("opacity", "0");
    return d3.selectAll("#d3tip").remove();
  }).on("click", function(d) {
    var curcolor;
    console.log(d);
    clickStatus[d] = 1 - clickStatus[d];
    svg.select("rect#" + d).attr("opacity", clickStatus[d]);
    if (clickStatus[d]) {
      curcolor = histColors.shift();
      histColors.push(curcolor);
      d3.select(this).attr("opacity", "0");
      svg.select("rect#" + d).attr("fill", curcolor);
      return grp4BkgdHist.append("path").datum(data.counts[d]).attr("d", histline).attr("id", d).attr("fill", "none").attr("stroke", curcolor).attr("stroke-width", "2");
    } else {
      return grp4BkgdHist.select("path#" + d).remove();
    }
  });
  lowsvg.append("rect").attr("x", 0).attr("y", 0).attr("width", w).attr("height", pad.top).attr("stroke", "none").attr("fill", bgcolor);
  lowsvg.append("rect").attr("x", 0).attr("y", 0).attr("width", pad.left).attr("height", h).attr("stroke", "none").attr("fill", bgcolor);
  lowsvg.append("rect").attr("x", pad.left).attr("y", pad.top).attr("height", h - pad.bottom - pad.top).attr("width", w - pad.left - pad.right).attr("stroke", bgcolor).attr("stroke-width", 2).attr("fill", "none");
  svg.append("text").text("Gene expression").attr("x", pad.left * 0.2).attr("y", h / 2).attr("fill", titlecolor).attr("transform", "rotate(270 " + (pad.left * 0.2) + " " + (h / 2) + ")").attr("dominant-baseline", "middle").attr("text-anchor", "middle");
  lowsvg.append("text").text("Gene expression").attr("x", (w - pad.left - pad.bottom) / 2 + pad.left).attr("y", h - pad.bottom * 0.2).attr("fill", titlecolor).attr("dominant-baseline", "middle").attr("text-anchor", "middle");
  return svg.append("text").text("Arrays, sorted by median expression").attr("x", (w - pad.left - pad.bottom) / 2 + pad.left).attr("y", h - pad.bottom * 0.2).attr("fill", titlecolor).attr("dominant-baseline", "middle").attr("text-anchor", "middle");
};

stop_manyboxplots = function() {
  return d3.selectAll("div#manyboxplots svg").remove();
};
