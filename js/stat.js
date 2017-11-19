'use strict';

// Зададим переменные заранее, чтобы в последствии легче было менять параметры
// Зададим цвета
var cloudColor = 'rgba(255, 255, 255, 1)';
var textColor = 'rgba(0, 0, 0, 1)';
var shadowColor = 'rgba(0, 0, 0, 0.7)';
var headerTextColor = 'rgba(0, 128, 0, 1)';
var ourColomnColor = 'rgba(255, 0, 0, 1)'; // Задаем цвет нашей колонки. По условию остальные колонки синего цвета с разной прозрачностью. Их определим ниже
// Параметры текста
var fontText = '16px PT Mono';
// Параметры облака, на котором выводится гистограмма с результатами
var cloudWidth = 420;
var cloudHeight = 270;
// Ширина колонки гистограммы
var columnWidth = 40;
// Выводимые сообщения
var firstMessage = 'Ура вы победили!';
var secondMessage = 'Список результатов:';

window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = shadowColor;
  ctx.fillRect(110, 20, cloudWidth, cloudHeight);

  ctx.fillStyle = cloudColor;
  ctx.fillRect(100, 10, cloudWidth, cloudHeight);

  ctx.fillStyle = headerTextColor;
  ctx.font = fontText;
  ctx.fillText(firstMessage, 120, 40);
  ctx.fillText(secondMessage, 120, 60);

  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histoHeight = 150;
  var histoX = 150;
  var scale = histoHeight / max;
  var columnIndent = 100;

  for (i = 0; i < times.length; i++) {
    var name = names[i];
    time = times[i];
    var height = scale * time;

    if (name === 'Вы') {
      ctx.fillStyle = ourColomnColor; // задаем нашему столбцу красный цвет, остальным будет присвоен синий
    } else {
      var randomNumberSaturation = (Math.random() * 255).toFixed(0); // вычисляем рандомное число прозрачности
      var randomBlue = 'rgb(0, 0,' + randomNumberSaturation + ')'; // получаем синий цвет с случайным значением прозрачности
      ctx.fillStyle = randomBlue;
    }

    ctx.fillRect(histoX + columnIndent * i, cloudHeight - height - 20, columnWidth, height);
    ctx.fillStyle = textColor;
    ctx.fillText(name, histoX + columnIndent * i, 100 + histoHeight + 20);
    ctx.fillText(time.toFixed(0), histoX + columnIndent * i, cloudHeight - height - 30);
  }
};
