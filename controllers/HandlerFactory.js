const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFutures');

exports.deleteOne = Model => catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc)
    {
        return next(new AppError('No document found !' , 404));
    }

    res.status(204).json({
        status : 'success',
        data : null
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id , req.body , {
        new : true,
        runValidators : true
    });

    if(!doc)
    {
        return next(new AppError('No document found !', 404));
    }

    res.status(200).json({
        status : 'success',
        data : {
            doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req , res , next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
        status : 'success',
        data : {
            doc
        }
    });
});

exports.getOne = (Model , populateOption) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if(populateOption)
    {
        query = query.populate(populateOption);
    }

    const doc = await query;

    if(!doc)
    {
        return next(new AppError('No document found !' , 404));
    }

    res.status(200).json({
        status : 'success',
        data : {
            doc
        }
    });

});

exports.getAll = Model => catchAsync(async (req, res, next) => {
    //to allow for nested GET (example reviews for appointments)
    let filter = {}

    const features = new ApiFeatures(Model.find(filter) , req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const doc = await features.query;

    res.status(200).json({
        status : 'success',
        requstedAt : req.requestTime,
        results : doc.length ,
        data : {
            data : doc
        }
    });
});

