const Validatetasktitle = (req, res, next) => {
    const title = req.body?.title;

    if (title === undefined || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (title.trim().length < 3 || title.trim().length > 100) {
        return res.status(400).json({
            message: "Title must be between 3 and 100 characters"
        });
    }

    next();
};

export default Validatetasktitle;