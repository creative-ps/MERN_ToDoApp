const { body, param, check, validationResult } = require('express-validator');

 class appValidator {
    validateCreateTask() {
       return [
                body('selectVal')
                .notEmpty()
                .withMessage('Category is required.'),
                body('task')
                .notEmpty()
                .withMessage('Task is required.'),
                body('catId')
                .notEmpty()
                .withMessage('Category Id is required.')
                .isMongoId().withMessage('invalid mongo database ID.')
              ] 
    }

    validateId() {
      return [
            param('id').notEmpty().withMessage('ID is required')
            .isMongoId().withMessage('invalid mongo database ID')
            ]
    }

    validateUpdateTaskBooleanStatus(){
      return [
              body('completed').trim().notEmpty().withMessage('Boolean field is empty.'),
              check('completed').isBoolean().withMessage('Boolean value is required'),
              param('id').notEmpty().withMessage('ID is required')
            .isMongoId().withMessage('invalid mongo database ID')
             ]
    }

    validateUpdateTaskStatus(){
      return [
              body('title').trim().notEmpty().withMessage('Title field is required.'),
              param('id').notEmpty().withMessage('ID is required')
            .isMongoId().withMessage('Invalid mongo database ID')
             ]
    }

    validateCategory(){
      return [
                body('name').escape().trim().notEmpty().withMessage('Category name is required.')
             ]
    }

    validateUser(){
      return [
                body('email').trim().notEmpty().isEmail().withMessage('Email field is required.'),
                body('password').trim().notEmpty().isLength({ min: 7 }).withMessage('Password field is required.'),
                body('rePassword').trim().notEmpty().isLength({ min: 7 }).withMessage('Repassword field is required.')
             ]
    }


    appValidationMiddleware(req, res, next){

      const errors = validationResult(req);
      if(!errors.isEmpty()){
        let err = '';
        (errors.errors).forEach(element => {
          err+=element.msg+' ';
        });

        return res.status(400).json({ message: err });
      }
      next();
    }
}



module.exports = new appValidator();