'use strict';
// Рисуем фон
window.renderStatistics = function (ctx, names, times) {
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.bezierCurveTo(120, 105, 50, 20, 150, 20);
  ctx.bezierCurveTo(150, 20, 180, 5, 240, 20);
  ctx.bezierCurveTo(240, 20, 310, 0, 360, 20);
  ctx.bezierCurveTo(360, 20, 535, 0, 495, 50);
  ctx.bezierCurveTo(495, 50, 545, 80, 505, 100);
  ctx.bezierCurveTo(505, 100, 585, 180, 505, 220);
  ctx.bezierCurveTo(505, 220, 545, 290, 445, 275);
  ctx.bezierCurveTo(445, 275, 395, 310, 315, 270);
  ctx.bezierCurveTo(315, 270, 235, 310, 210, 275);
  ctx.bezierCurveTo(210, 275, 105, 320, 115, 230);
  ctx.bezierCurveTo(115, 230, 35, 170, 120, 105);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'transparent';

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!\nСписок результатов:', 140, 40);

  // Находим максимальное время для определения высоты колонок
  var maxTime = 0;
  var maxIndex = 0;

  for (var j = 0; j <= times.length - 1; j++) {
    if (times[j] > maxTime) {
      maxTime = times[j];
      maxIndex = j;
    }
  }
  ctx.fillText('Худшее время: ' + Math.round(maxTime) + ' мс у игрока ' + names[maxIndex], 140, 60);

  // Находим высоту и координаты каждой колонки
  var histogramHeight = 150;
  var step = histogramHeight / maxTime;
  var histogramWidth = 40;
  var initialX = 150;
  var initialY = 85;
  var indentX = 50;
  var indentY = 10;
  var lineHeight = 20;

  for (var i = 0; i <= times.length - 1; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (0.1 + Math.random()).toFixed(1) + ')';
    }
    ctx.fillRect(initialX + (histogramWidth + indentX) * i, initialY + indentY + (initialX - times[i] * step), histogramWidth, times[i] * step);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.round(times[i]), initialX + (histogramWidth + indentX) * i, initialY + (initialX - times[i] * step));
    ctx.fillText(names[i], initialX + (histogramWidth + indentX) * i, initialY + indentY + histogramHeight + lineHeight);
  }
};
