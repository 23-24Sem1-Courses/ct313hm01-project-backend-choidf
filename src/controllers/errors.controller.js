const ApiError = require("../api-error");

function methodNotAllowed(req, res, next) {
  if (req.route) {
    //Xác định các phương thức HTTP hỗ trợ
    // trên tài nguyên
    const httpMethods = Object.keys(req.route.methods)
      .filter((method) => method !== "_all")
      .map((method) => method.toUpperCase());
    return next(
      new ApiError(405, "Method Not Allowed", {
        Allow: httpMethods.join(", "),
      })
    );
  }
  return next();
}

function resourceNotFound(req, res, next) {
  //Code ở đây sẽ chạy khi không có route được định nghĩa nào
  // khớp với yêu cầu. gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"));
}

function handleError(error, req, res, next) {
  //Hàm xử lý lỗi tập trung.
  //Trong các đoạn code xử lý ở các route, gọi next(error)
  // sẽ chuyển về hàm xử lý lỗi này.

  //Nếu header đã bắt đầu gửi về cho client,
  // giao lại cho handler lỗi mặc định của Express
  if (res.headersSent) {
    return next(error);
  }

  return res
    .status(error.statusCode || 500)
    .set(error.headers || {})
    .json({
      message: error.message || "Internal Server Error",
    });
}

module.exports = {
  methodNotAllowed,
  resourceNotFound,
  handleError,
};
