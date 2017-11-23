'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Массив с координатами для создания облака
  var positionCloud = [
    [120, 105, 50, 20, 150, 20],
    [150, 20, 180, 5, 240, 20],
    [240, 20, 310, 0, 360, 20],
    [360, 20, 535, 0, 495, 50],
    [495, 50, 545, 80, 505, 100],
    [505, 100, 585, 180, 505, 220],
    [505, 220, 545, 290, 445, 275],
    [445, 275, 395, 310, 315, 270],
    [315, 270, 235, 310, 210, 275],
    [210, 275, 105, 320, 115, 230],
    [115, 230, 35, 170, 120, 105]
  ];

  // Нахождение максимального времени для определения высоты колонок
  var maxTime = Math.max.apply(null, times);
  var maxIndex = times.indexOf(maxTime);

  // Нахождение высоты и координат каждой колонки
  var histogramHeight = 150;
  var step = histogramHeight / maxTime;
  var histogramWidth = 40;
  var initialX = 150;
  var initialY = 85;
  var indentX = 50;
  var indentY = 10;
  var lineHeight = 20;

  var renderCloud = function (cloud, points) {
    // Тень для облака
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';

    // Облако для фона
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    points.forEach(function (coordinate) {
      ctx.bezierCurveTo.apply(ctx, coordinate);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  renderCloud(ctx, positionCloud);

  // Надпись с результатами
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!\nСписок результатов:', 140, 40);
  ctx.fillText('Худшее время: ' + Math.round(maxTime) + ' мс у игрока ' + names[maxIndex], 140, 60);

  // Вывод гистограммы
  var showResults = function (userTime, i) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + (0.1 + Math.random()).toFixed(1) + ')';
    ctx.fillRect(initialX + (histogramWidth + indentX) * i, initialY + indentY + (initialX - times[i] * step), histogramWidth, times[i] * step);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.round(times[i]), initialX + (histogramWidth + indentX) * i, initialY + (initialX - times[i] * step));
    ctx.fillText(names[i], initialX + (histogramWidth + indentX) * i, initialY + indentY + histogramHeight + lineHeight);
  };

  times.forEach(showResults);
};
