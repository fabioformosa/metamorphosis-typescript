import {converterRegistry} from '../decorators/converter-decorator';
import { debugOpts, logger as loggerObj } from 'src/consts/log';

export class ConversionService {

  constructor({logger} : { logger: boolean | ((msg: string) => void)} = {logger: false}){
    debugOpts.enable = logger !== false;
      if(debugOpts.enable && typeof logger === "function")
      debugOpts.fn =  logger;
      loggerObj.log(`METAMORPHOSIS - Created conversion service with debugOpts ${debugOpts.enable}`);
  }

  convert(sourceObj: any, targetClass: NewableFunction): any{
    const converter = converterRegistry.getConverter(sourceObj.constructor, targetClass);
    if(!converter)
      throw new Error(`Not found any converter to transform ${sourceObj.constructor.name} into ${targetClass.name}`);
    return converter.convert(sourceObj);
  }
  
  convertBySource(sourceObj: any, sourceClass: NewableFunction, targetClass: NewableFunction): any{
    const converter = converterRegistry.getConverter(sourceClass, targetClass);
    if(!converter)
      throw new Error(`Not found any converter to transform ${sourceClass.name} into ${targetClass.name}`);
    return converter.convert(sourceObj);
  }

}

