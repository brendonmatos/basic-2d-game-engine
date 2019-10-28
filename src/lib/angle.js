exports.angle = (anchor, point) => Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI + 180;
