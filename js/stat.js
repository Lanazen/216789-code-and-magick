//Рисуем фон
window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = '#ffffff';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!\nСписок результатов:', 140, 40);

//Находим максимальное время для определения высоты колонок
  var maxTime = 0;
  var maxIndex = 0;

  for (var i = 0; i <= times.length - 1; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
      maxIndex = i;
    }
  }
  ctx.fillText('Худшее время: ' + Math.round(maxTime) + ' мс у игрока ' + names[maxIndex], 140, 60);

//Находим высоту и координаты каждой колонки
  var histogramHeight = 150;
  var step = histogramHeight / maxTime;
  var histogramWidth = 40;
  var initialX = 150;
  var initialY = 85;
  var indentX = 50;
  var indentY = 10;
  var lineHeight = 20;

  for  (var i = 0; i <= times.length - 1; i++) {
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
