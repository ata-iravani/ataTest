var seCreatorApp = null;
if (typeof ($CreateAnonymousDelegate) == 'undefined') {
    var $CreateAnonymousDelegate = function (target, func) {
        if (target == null || func == null)
            return func;
        var delegate = function () {
            return func.apply(target, arguments);
        };
        delegate.func = func;
        delegate.target = target;
        delegate.isDelegate = true;
        return delegate;
    }
}
if (typeof($CreateDelegate)=='undefined'){
    if(typeof($iKey)=='undefined') var $iKey = 0;
    if(typeof($pKey)=='undefined') var $pKey = String.fromCharCode(1);
    var $CreateDelegate = function(target, func){
        if (target == null || func == null) 
            return func;
        if(func.target==target && func.func==func)
            return func;
        if (target.$delegateCache == null)
            target.$delegateCache = {};
        if (func.$key == null)
            func.$key = $pKey + String(++$iKey);
        var delegate;
        if(target.$delegateCache!=null)
            delegate = target.$delegateCache[func.$key];
        if (delegate == null){
            delegate = function(){
                return func.apply(target, arguments);
            };
            delegate.func = func;
            delegate.target = target;
            delegate.isDelegate = true;
            if(target.$delegateCache!=null)
                target.$delegateCache[func.$key] = delegate;
        }
        return delegate;
    }
}
if (typeof ($Inherit) == 'undefined') {
	var $Inherit = function (ce, ce2) {

		if (typeof (Object.getOwnPropertyNames) == 'undefined') {

			for (var p in ce2.prototype)
				if (typeof (ce.prototype[p]) == 'undefined' || ce.prototype[p] == Object.prototype[p])
					ce.prototype[p] = ce2.prototype[p];
			for (var p in ce2)
				if (typeof (ce[p]) == 'undefined')
					ce[p] = ce2[p];
			ce.$baseCtor = ce2;

		} else {

			var props = Object.getOwnPropertyNames(ce2.prototype);
			for (var i = 0; i < props.length; i++)
				if (typeof (Object.getOwnPropertyDescriptor(ce.prototype, props[i])) == 'undefined')
					Object.defineProperty(ce.prototype, props[i], Object.getOwnPropertyDescriptor(ce2.prototype, props[i]));

			for (var p in ce2)
				if (typeof (ce[p]) == 'undefined')
					ce[p] = ce2[p];
			ce.$baseCtor = ce2;

		}

	}
};
if (typeof($CreateExtensionDelegate)=='undefined'){
    if(typeof($iKey)=='undefined') var $iKey = 0;
    if(typeof($pKey)=='undefined') var $pKey = String.fromCharCode(1);
    var $CreateExtensionDelegate = function(target, func){
        if (target == null || func == null) 
            return func;
        if(func.target==target && func.func==func)
            return func;
        if (target.$delegateCache == null)
            target.$delegateCache = {};
        if (func.$key == null)
            func.$key = $pKey + String(++$iKey);
        var delegate;
        if(target.$delegateCache!=null)
            delegate = target.$delegateCache[func.$key];
        if (delegate == null){
            delegate = function(){
                var args = [target];
                for(var i=0;i<arguments.length;i++)
                    args.push(arguments[i]);
                return func.apply(null, args);
            };
            delegate.func = func;
            delegate.target = target;
            delegate.isDelegate = true;
            delegate.isExtensionDelegate = true;
            if(target.$delegateCache!=null)
                target.$delegateCache[func.$key] = delegate;
        }
        return delegate;
    }
}
if (typeof($CreateException)=='undefined') 
 {
    var $CreateException = function(ex, error) 
    {
        if(error==null)
            error = new Error();
        if(ex==null)
            ex = new System.Exception.ctor();       
        error.message = ex.message;
        for (var p in ex)
           error[p] = ex[p];
        return error;
    }
}
function $CreateMulticastDelegateFunction()
 {
    var del2 = null;
    
    var del=function()
    {
        var x=undefined;
        for(var i=0;i < del2.delegates.length;i++)
        {
            var del3=del2.delegates[i];
            x = del3.apply(null,arguments);
        }
        return x;
    };
    del.isMulticastDelegate = true;
    del2 = del;   
    
    return del;
};
function $CombineDelegates(del1,del2)
 {
    if(del1 == null)
        return del2;
    if(del2 == null)
        return del1;
    var del=$CreateMulticastDelegateFunction();
    del.delegates = [];
    if(del1.isMulticastDelegate)
    {
        for(var i=0;i < del1.delegates.length;i++)
            del.delegates.push(del1.delegates[i]);
    }
    else
    {
        del.delegates.push(del1);
    }
    if(del2.isMulticastDelegate)
    {
        for(var i=0;i < del2.delegates.length;i++)
            del.delegates.push(del2.delegates[i]);
    }
    else
    {
        del.delegates.push(del2);
    }
    return del;
};
function $RemoveDelegate(delOriginal,delToRemove)
 {
    if(delToRemove == null || delOriginal == null)
        return delOriginal;
    if(delOriginal.isMulticastDelegate)
    {
        if(delToRemove.isMulticastDelegate)
            throw new Error("Multicast to multicast delegate removal is not implemented yet");
        var del=$CreateMulticastDelegateFunction();
        for(var i=0;i < delOriginal.delegates.length;i++)
        {
            var del2=delOriginal.delegates[i];
            if(del2 != delToRemove)
            {
                if(del.delegates == null)
                    del.delegates = [];
                del.delegates.push(del2);
            }
        }
        if(del.delegates == null)
            return null;
        if(del.delegates.length == 1)
            return del.delegates[0];
        return del;
    }
    else
    {
        if(delToRemove.isMulticastDelegate)
            throw new Error("single to multicast delegate removal is not supported");
        if(delOriginal == delToRemove)
            return null;
        return delOriginal;
    }
};
function Is(obj, type)
 {
    return  (obj != null) && (obj instanceof type || obj.constructor==type);
};
function As(obj, type)
 {
    return Is(obj, type) ? obj : null;
};
function Cast(obj, type)
 {
    return obj;
};
function $Inherit(ce, ce2)
 {
     
                var props = Object.getOwnPropertyNames(ce2.prototype);
                for (var i = 0; i < props.length; i++)
                    if (typeof (Object.getOwnPropertyDescriptor(ce.prototype, props[i])) == 'undefined')
                        Object.defineProperty(ce.prototype, props[i], Object.getOwnPropertyDescriptor(ce2.prototype, props[i]));

                props = Object.getOwnPropertyNames(ce2);
                for (i = 0; i < props.length; i++)
                    if (typeof (Object.getOwnPropertyDescriptor(ce, props[i])) == 'undefined')
                        Object.defineProperty(ce, props[i], Object.getOwnPropertyDescriptor(ce2, props[i]));

                ce.$baseCtor = ce2;;
};
if (typeof(shetab) == "undefined")
    var shetab = {};
if (typeof(shetab.common) == "undefined")
    shetab.common = {};
shetab.common.Convert = function ()
 {
};
shetab.common.Convert.toBoolean = function (value, defaultValue)
 {
    defaultValue = shetab.common.Utility.checkUndefined(defaultValue, false);
    try
    {
        var parsed = parseInt(value);
        if (!isNaN(parsed) && parsed !== 0)
            return true;
        switch (value.toLowerCase())
        {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
                return false;
        }
    }
    catch ($$e1)
    {
    }
    return defaultValue;
};


shetab.common.Convert.toNumber = function (value, defaultValue)
 {
    return shetab.common.Convert.toFloat(value, defaultValue);
};
shetab.common.Convert.toInteger = function (value, defaultValue)
 {
    defaultValue = shetab.common.Utility.checkUndefined(defaultValue, 0);
    try
    {
        var ret = parseInt(value);
        if (!isNaN(ret))
            return ret;
    }
    catch ($$e2)
    {
    }
    return defaultValue;
};
shetab.common.Convert.toFloat = function (value, defaultValue)
 {
    defaultValue = shetab.common.Utility.checkUndefined(defaultValue, 0);
    try
    {
        var ret = parseFloat(value);
        if (!isNaN(ret))
            return ret;
    }
    catch ($$e3)
    {
    }
    return defaultValue;
};
shetab.common.Convert.toColor = function (value, defaultValue)
 {
    defaultValue = shetab.common.Utility.checkUndefined(defaultValue, new shetab.common.Color());
    try
    {
        return shetab.common.Color.parseFromString(value);
    }
    catch ($$e4)
    {
    }
    return defaultValue;
};
shetab.common.Convert.toPoint = function (value, defaultValue)
 {
    defaultValue = shetab.common.Utility.checkUndefined(defaultValue, new shetab.common.Point());
    try
    {
        return shetab.common.Point.parseFromString(value);
    }
    catch ($$e5)
    {
    }
    return defaultValue;
};
shetab.common.Convert.toSize = function (value, defaultValue)
 {
    defaultValue = shetab.common.Utility.checkUndefined(defaultValue, new shetab.common.Size());
    try
    {
        return shetab.common.Size.parseFromString(value);
    }
    catch ($$e6)
    {
    }
    return defaultValue;
};
shetab.common.Convert.toFont = function (value, defaultValue)
 {
    defaultValue = shetab.common.Utility.checkUndefined(defaultValue, null);
    try
    {
        return shetab.common.Font.parseFromXml(value);
    }
    catch ($$e7)
    {
    }
    return defaultValue;
};
shetab.common.Convert.toStringWithLeadingZero = function (value, length, radix)
 {
    radix = shetab.common.Utility.checkUndefined(radix, 10);
    var s = value.toString(radix);
    while (s.length < length)
    s = "0" + s;
    return s;
};
shetab.common.Convert.buffer_fromBase64 = function (base64String)
 {
    return  window.atob(base64String);
};
shetab.common.Convert.buffer_toBase64 = function (buffer)
 {
    return  window.btoa(buffer);
};
shetab.common.Convert.htmlEncode = function (str)
 {
    if (str === null)
        return "";
    return str.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("\"", "g"), "&quot;").replace(new RegExp("\'", "g"), "&#39;").replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g"), "&gt;");
};
shetab.common.Convert.htmlDecode = function (html)
 {
    if (html === null)
        return "";
    return html.replace(new RegExp("&amp;", "g"), "&").replace(new RegExp("&quot;", "g"), "\"").replace(new RegExp("&#39;", "g"), "\'").replace(new RegExp("&lt;", "g"), "<").replace(new RegExp("&gt;", "g"), ">");
};
if (typeof(shetab.common.converters) == "undefined")
    shetab.common.converters = {};
shetab.common.converters.Base64Converter = function ()
 {
};
shetab.common.converters.Base64Converter.prototype.convert = function (value, targetCtor, parameter)
 {
    return shetab.common.Convert.buffer_toBase64(value);
};
shetab.common.converters.Base64Converter.prototype.convertBack = function (value, targetCtor, parameter)
 {
    return shetab.common.Convert.buffer_fromBase64(value);
};
shetab.common.converters.ObjectConverter = function ()
 {
    this.nullValue = null;
    this.serializerRootElementName = null;
};
shetab.common.converters.ObjectConverter.prototype.convert = function (value, targetCtor, parameter)
 {
    if (value === null)
        return this.nullValue;
    if (this.serializerRootElementName !== null && shetab.common.serialization.Serializer.isSerializable(value))
        return shetab.common.serialization.Serializer.serializeToXml(value, this.serializerRootElementName);
    return value.toString();
};
shetab.common.converters.ObjectConverter.prototype.convertBack = function (value, targetCtor, parameter)
 {
    if (value === this.nullValue)
        return null;
    if (targetCtor ===  Boolean)
        return shetab.common.Convert.toBoolean(value);
    if (targetCtor ===  Number)
        return shetab.common.Convert.toNumber(value);
    if (targetCtor ===  String)
        return value;
    if (targetCtor.hasOwnProperty("fromString"))
        return targetCtor["fromString"](value);
    if (targetCtor.hasOwnProperty("parseFromString"))
        return targetCtor["parseFromString"](value);
    if (shetab.common.serialization.Serializer.isSerializableType(targetCtor))
        return shetab.common.serialization.Serializer.serializeFromXml(value, targetCtor);
    throw new Error("Could not parse object from string!");
};
shetab.common.CultureInfo = function (name)
 {
    this._name = null;
    var parts = name.split("-");
    if (parts.length > 0)
        parts[0] = parts[0].toLowerCase();
    if (parts.length > 1)
        parts[parts.length - 1] = parts[parts.length - 1].toUpperCase();
    if (parts.length > 2)
        parts[1] = shetab.common.StringHelper.toCapitalCase(parts[1]);
    this.set_name(parts.join("-"));
};
shetab.common.CultureInfo.prototype.get_name = function ()
 {
    return this._name;
};
shetab.common.CultureInfo.prototype.set_name = function (value)
 {
    this._name = value;
};
Object.defineProperty(shetab.common.CultureInfo.prototype, "name", {get: shetab.common.CultureInfo.prototype.get_name, set: shetab.common.CultureInfo.prototype.set_name, enumerable: true});
shetab.common.CultureInfo.prototype.get_parent = function ()
 {
    var parts = this.get_name().split("-");
    return parts.length > 1 ? new shetab.common.CultureInfo(parts[0]) : null;
};
Object.defineProperty(shetab.common.CultureInfo.prototype, "parent", {get: shetab.common.CultureInfo.prototype.get_parent, enumerable: true});
shetab.common.CultureInfo.prototype.get_isNeutralCulture = function ()
 {
    return this.get_parent() === null;
};
Object.defineProperty(shetab.common.CultureInfo.prototype, "isNeutralCulture", {get: shetab.common.CultureInfo.prototype.get_isNeutralCulture, enumerable: true});
shetab.common.CultureInfo.prototype.equals = function (cultureInfo)
 {
    return cultureInfo !== null && this.get_name() === cultureInfo.get_name();
};
shetab.common.CultureInfo.getBestCulture = function (cultureNames, cultureName, defaultCutlrueName)
 {
    if (cultureName === null)
        return defaultCutlrueName;
    var culture = new shetab.common.CultureInfo(cultureName);
    var cultures =  [];
    for (var $i2 = 0, $l2 = cultureNames.length, item = cultureNames[$i2]; $i2 < $l2; $i2++, item = cultureNames[$i2])
        cultures.push(new shetab.common.CultureInfo(item));
    for (var $i3 = 0, $l3 = cultures.length, item = cultures[$i3]; $i3 < $l3; $i3++, item = cultures[$i3])
        if (item.equals(item))
            return item.get_name();
    culture = (culture.get_parent() !== null ? culture.get_parent() : culture);
    for (var $i4 = 0, $l4 = cultures.length, item = cultures[$i4]; $i4 < $l4; $i4++, item = cultures[$i4])
    {
        var cul = (item.get_parent() !== null ? item.get_parent() : item);
        if (culture.equals(cul))
            return item.get_name();
    }
    return defaultCutlrueName;
};
shetab.common.EventArgs = function ()
 {
};
if (typeof(shetab.common.componentModel) == "undefined")
    shetab.common.componentModel = {};
shetab.common.componentModel.PropertyChangedEventHandlerArgs = function (propertyName)
 {
    this._propertyName = null;
    this._propertyName = propertyName;
};
shetab.common.componentModel.PropertyChangedEventHandlerArgs.prototype.get_propertyName = function ()
 {


    return this._propertyName;
};
Object.defineProperty(shetab.common.componentModel.PropertyChangedEventHandlerArgs.prototype, "propertyName", {get: shetab.common.componentModel.PropertyChangedEventHandlerArgs.prototype.get_propertyName, enumerable: true});
shetab.common.Html = function ()
 {
};
shetab.common.Html.findLabelOfControl = function (element)
 {
    if (!shetab.common.Utility.isDefined(element.id))
        return null;
    var collection = document.getElementsByTagName("label");
    for (var i = 0; i < collection.length; i++)
    {
        var ele = collection[i]instanceof HTMLElement || collection[i] == null ? collection[i] : (function ()
        {
            throw new Error("InvalidCastException");
        }());
        if (ele.getAttribute("for") === element.id)
            return ele instanceof HTMLLabelElement || ele == null ? ele : (function ()
            {
                throw new Error("InvalidCastException");
            }());
    }
    return null;
};
shetab.common.Html.isDescendant = function (parent, child)
 {
    var node = child.parentNode;
    while (node !== null)
    {
        if (node === parent)
            return true;
        node = node.parentNode;
    }
    return false;
};
if (typeof(shetab.common.serialization) == "undefined")
    shetab.common.serialization = {};
shetab.common.serialization.Serializer = function ()
 {
};
shetab.common.serialization.Serializer.isCustomSerializable = function (obj)
 {
    return obj !== null && typeof(obj["serialize"]) === "function";
};
shetab.common.serialization.Serializer.isSerializable = function (obj)
 {
    return obj !== null && typeof(obj["getSerializationInfo"]) === "function";
};
shetab.common.serialization.Serializer.isCustomSerializableType = function (type)
 {
    return type !== null && shetab.common.serialization.Serializer.isCustomSerializable( type.prototype);
};
shetab.common.serialization.Serializer.isSerializableType = function (type)
 {
    return type !== null && shetab.common.serialization.Serializer.isSerializable(type.prototype);
};
shetab.common.serialization.Serializer.serializeClone = function (obj, objectCtor)
 {
    return shetab.common.serialization.Serializer.serializeFromXml(shetab.common.serialization.Serializer.serializeToXml(obj, "root"), objectCtor);
};
shetab.common.serialization.Serializer.serializeEquals = function (obj1, obj2)
 {
    if (obj1 === null || obj2 === null)
        return obj1 === obj2;
    return shetab.common.serialization.Serializer.serializeToXml(obj1, "root") === shetab.common.serialization.Serializer.serializeToXml(obj2, "root");
};
shetab.common.serialization.Serializer.serializeFromXml = function (xml, objectCtor)
 {
    var obj = shetab.common.Utility.createObjectByCtor(objectCtor);
    shetab.common.serialization.Serializer.deserialize(obj, shetab.common.Xml.loadXmlString(xml).documentElement);
    return obj;
};
shetab.common.serialization.Serializer.serializeToXml = function (obj, rootElementName)
 {
    rootElementName = rootElementName.charAt(0).toLowerCase() + rootElementName.substr(1);
    var xmlDoc = shetab.common.Xml.createXmlDoc(rootElementName);
    shetab.common.serialization.Serializer.serialize(obj, xmlDoc.documentElement);
    return shetab.common.Xml.toXmlString(xmlDoc);
};
shetab.common.serialization.Serializer.serialize = function (obj, element, context, forceAuto)
 {
    context = shetab.common.Utility.checkUndefined(context, null);
    forceAuto = shetab.common.Utility.checkUndefined(forceAuto, false);
    if (shetab.common.serialization.Serializer.isCustomSerializable(obj) && !forceAuto)
        obj.serialize(element, context);
    else if (shetab.common.serialization.Serializer.isSerializable(obj))
        shetab.common.serialization.Serializer.autoSerialize(obj, element, context);
    else
        throw new Error(forceAuto ? "Object does not support IAutoSerializable" : "Object does not support ISerializable nor IAutoSerializable");
};
shetab.common.serialization.Serializer.deserialize = function (obj, element, context, forceAuto)
 {
    context = shetab.common.Utility.checkUndefined(context, null);
    forceAuto = shetab.common.Utility.checkUndefined(forceAuto, false);
    if (shetab.common.serialization.Serializer.isCustomSerializable(obj) && !forceAuto)
        obj.deserialize(element, context);
    else if (shetab.common.serialization.Serializer.isSerializable(obj))
        shetab.common.serialization.Serializer.autoDeserialize(obj, element, context);
    else
        throw new Error(forceAuto ? "Object does not support IAutoSerializable" : "Object does not support ISerializable nor IAutoSerializable");
};
shetab.common.serialization.Serializer.autoSerialize = function (obj, element, context)
 {
    var serInfo = new shetab.common.serialization.SerializationInfo();
    obj.getSerializationInfo(serInfo, context);
    for (var propName in serInfo.propertyInfos)
    {
        var rootElement = element;
        var propInfo = serInfo.propertyInfos[propName];
        var propValue = obj[propName];
        if (propValue === undefined)
            throw new Error("AutoSerializer could not find " + propName + " property!");
        if (propValue === null)
            continue;
        if (propInfo.rootElementName !== null)
        {
            rootElement = shetab.common.Xml.selectSingleNode(element, propInfo.rootElementName);
            if (rootElement === null)
            {
                rootElement = element.ownerDocument.createElement(propInfo.rootElementName);
                element.appendChild(rootElement);
            }
        }
        if (Is(propInfo, shetab.common.serialization.SerializationInfo.PropertyDictionaryInfo) || Is(propInfo, shetab.common.serialization.SerializationInfo.PropertyArrayInfo))
        {
            var collInfo = propInfo;
            if (collInfo.get_itemElementName() === null)
                throw new Error("itemElementName could not be null for SerializationInfo collections!");
            var collElement = rootElement;
            if (collInfo.get_collectionElementName() !== null)
            {
                collElement = rootElement.ownerDocument.createElement(collInfo.get_collectionElementName());
                rootElement.appendChild(collElement);
            }
            for (var key in propValue)
            {
                if (!propValue.hasOwnProperty(key))
                    continue;
                var itemElement = collElement.ownerDocument.createElement(collInfo.get_itemElementName());
                collElement.appendChild(itemElement);
                if (Is(propInfo, shetab.common.serialization.SerializationInfo.PropertyDictionaryInfo))
                {
                    if (collInfo.itemKeyAttributeName === null)
                        throw new Error("itemKeyAttributeName could not be null for SerializationInfo dictionary!");
                    itemElement.setAttribute(collInfo.itemKeyAttributeName, key);
                }
                shetab.common.serialization.Serializer.serializeData(collInfo.itemInfo, propValue[key], itemElement, context);
            }
        }
        else
        {
            var pi = propInfo;
            shetab.common.serialization.Serializer.serializeData(pi, propValue, rootElement, context);
        }
    }
};
shetab.common.serialization.Serializer.autoDeserialize = function (obj, element, context)
 {
    var serInfo = new shetab.common.serialization.SerializationInfo();
    obj.getSerializationInfo(serInfo, context);
    for (var propName in serInfo.propertyInfos)
    {
        var rootElement = element;
        var propInfo = serInfo.propertyInfos[propName];
        if (propInfo.rootElementName !== null)
        {
            rootElement = shetab.common.Xml.selectSingleNode(element, propInfo.rootElementName);


            if (rootElement === null)
                continue;
        }
        if (Is(propInfo, shetab.common.serialization.SerializationInfo.PropertyDictionaryInfo) || Is(propInfo, shetab.common.serialization.SerializationInfo.PropertyArrayInfo))
        {
            var collInfo = propInfo;
            if (collInfo.get_itemElementName() === null)
                throw new Error("itemElementName could not be null for SerializationInfo collections!");
            var collElement = rootElement;
            if (collInfo.get_collectionElementName() !== null)
            {
                collElement = shetab.common.Xml.selectSingleNode(rootElement, collInfo.get_collectionElementName());
                if (collElement === null)
                    continue;
            }
            var propValue = Is(propInfo, shetab.common.serialization.SerializationInfo.PropertyDictionaryInfo) ? new Object() :  [];
            obj[propName] = propValue;
            var elements = shetab.common.Xml.getElementsByTagName(collElement, collInfo.get_itemElementName());
            for (var $i5 = 0, $l5 = elements.length, itemElement = elements[$i5]; $i5 < $l5; $i5++, itemElement = elements[$i5])
            {
                var itemObject;
                if (!(function ()
                {
                    itemObject = {Value: itemObject};
                    var $res = shetab.common.serialization.Serializer.deserializeData(collInfo.itemInfo, itemObject, itemElement, context);
                    itemObject = itemObject.Value;
                    return $res;
                })())
                    continue;
                if (Is(propInfo, shetab.common.serialization.SerializationInfo.PropertyDictionaryInfo))
                {
                    if (collInfo.itemKeyAttributeName === null)
                        throw new Error("itemKeyAttributeName could not be null for SerializationInfo dictionary!");
                    var key = shetab.common.Xml.getAttribute(itemElement, collInfo.itemKeyAttributeName);
                    if (key !== null)
                        propValue[key] = itemObject;
                }
                else
                {
                    propValue.push(itemObject);
                }
            }
        }
        else
        {
            var pi = propInfo;
            var itemObject;
            if ((function ()
            {
                itemObject = {Value: itemObject};
                var $res = shetab.common.serialization.Serializer.deserializeData(pi, itemObject, rootElement, context);
                itemObject = itemObject.Value;
                return $res;
            })())
                obj[propName] = itemObject;
        }
    }
};
shetab.common.serialization.Serializer.serializeData = function (propertyInfo, obj, element, context)
 {
    var nodeElement = element;
    if (propertyInfo.get_elementName() !== null)
    {
        nodeElement = shetab.common.Xml.selectSingleNode(element, propertyInfo.get_elementName());
        if (nodeElement === null)
        {
            nodeElement = element.ownerDocument.createElement(propertyInfo.get_elementName());
            element.appendChild(nodeElement);
        }
    }
    if (shetab.common.serialization.Serializer.isSerializable(obj))
    {
        if (propertyInfo.get_attributeName() !== null)
            throw new Error("Serializable object could not serialize as attribute!");
        shetab.common.serialization.Serializer.serialize(obj, nodeElement, context);
        return;
    }
    var value = propertyInfo.valueConverter.convert(obj, propertyInfo.typeCtor, null);
    if (propertyInfo.get_attributeName() === shetab.common.serialization.SerializationInfo.tagCDATA)
    {
        value = value.replace("]]>", shetab.common.serialization.SerializationInfo.tagCDATA);
        var cdataSection = element.ownerDocument.createCDATASection(value);
        nodeElement.appendChild(cdataSection);
    }
    else if (propertyInfo.get_attributeName() !== null)
        nodeElement.setAttribute(propertyInfo.get_attributeName(), value);
    else
        shetab.common.Xml.setElementText(nodeElement, value);
};
shetab.common.serialization.Serializer.deserializeData = function (propertyInfo, obj, element, context)
 {
    obj.Value = null;
    var nodeElement = element;
    if (propertyInfo.get_elementName() !== null)
    {
        nodeElement = shetab.common.Xml.selectSingleNode(element, propertyInfo.get_elementName());
        if (nodeElement === null)
            return false;
    }
    if (shetab.common.serialization.Serializer.isSerializableType(propertyInfo.typeCtor))
    {
        if (propertyInfo.get_attributeName() !== null)
            throw new Error("Serializable object could not serialize as attribute!");
        obj.Value = shetab.common.Utility.createObjectByCtor(propertyInfo.typeCtor);
        shetab.common.serialization.Serializer.deserialize(obj.Value, nodeElement, context);
        return true;
    }
    var res;
    if (propertyInfo.get_attributeName() === shetab.common.serialization.SerializationInfo.tagCDATA)
    {
        res = shetab.common.Xml.getCData(nodeElement);
        if (res !== null)
            res = res.replace(shetab.common.serialization.SerializationInfo.tagCDATA, "]]>");
    }
    else if (propertyInfo.get_attributeName() !== null)
        res = shetab.common.Xml.getAttribute(nodeElement, propertyInfo.get_attributeName());
    else
        res = shetab.common.Xml.getElementText(nodeElement);
    if (res === null)
        return false;
    obj.Value = propertyInfo.valueConverter.convertBack(res, propertyInfo.typeCtor, null);
    return true;
};
shetab.common.serialization.SerializationInfo = function ()
 {
    this.propertyInfos = new Object();
};
shetab.common.serialization.SerializationInfo.tagCDATA = "$$CDATA$$";
shetab.common.serialization.SerializationInfo.prototype.add = function (propName, type, useElement)
 {
    useElement = shetab.common.Utility.checkUndefined(useElement, false);
    var info = (function ()
    {
        var $v1 = new shetab.common.serialization.SerializationInfo.PropertyInfo();
        $v1.typeCtor = type;
        $v1.set_elementName(shetab.common.serialization.Serializer.isSerializableType(type) || useElement ? propName : null);
        $v1.set_attributeName(shetab.common.serialization.Serializer.isSerializableType(type) || useElement ? null : propName);
        return $v1;
    }).call(this);
    this.propertyInfos[propName] = info;
    return info;
};
shetab.common.serialization.SerializationInfo.prototype.addBoolean = function (propName, useElement)
 {
    return this.add(propName,  Boolean, useElement);
};
shetab.common.serialization.SerializationInfo.prototype.addNumber = function (propName, useElement)
 {
    return this.add(propName,  Number, useElement);
};
shetab.common.serialization.SerializationInfo.prototype.addString = function (propName, useElement)
 {
    return this.add(propName,  String, useElement);
};
shetab.common.serialization.SerializationInfo.prototype.addByteArray = function (propName, useElement)
 {
    var ret = this.add(propName,  Array, useElement);
    ret.valueConverter = new shetab.common.converters.Base64Converter();
    return ret;
};
shetab.common.serialization.SerializationInfo.prototype.addArray = function (propName, typeCtor, itemElementName)
 {
    var info = (function ()
    {
        var $v2 = new shetab.common.serialization.SerializationInfo.PropertyArrayInfo();
        $v2.set_collectionElementName(propName);
        $v2.set_itemElementName((itemElementName !== null ? itemElementName : "item"));
        $v2.itemInfo.typeCtor = typeCtor;
        return $v2;
    }).call(this);
    this.propertyInfos[propName] = info;
    return info;
};


shetab.common.serialization.SerializationInfo.prototype.addDictionary = function (propName, typeCtor, itemElementName, itemKeyAttributeName)
 {
    var info = (function ()
    {
        var $v3 = new shetab.common.serialization.SerializationInfo.PropertyDictionaryInfo();
        $v3.set_collectionElementName(propName);
        $v3.set_itemElementName((itemElementName !== null ? itemElementName : "item"));
        $v3.itemKeyAttributeName = (itemKeyAttributeName !== null ? itemKeyAttributeName : "id");
        $v3.itemInfo.typeCtor = typeCtor;
        return $v3;
    }).call(this);
    this.propertyInfos[propName] = info;
    return info;
};
if (typeof(shetab.common.serialization.SerializationInfo) == "undefined")
    shetab.common.serialization.SerializationInfo = {};
shetab.common.serialization.SerializationInfo.PropertyInfo = function ()
 {
    this.typeCtor = null;
    this.valueConverter = new shetab.common.converters.ObjectConverter();
    this._rootElementName = null;
    this._attributeName = null;
    this._elementName = null;
};
shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.get_rootElementName = function ()
 {
    return this._rootElementName;
};
shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.set_rootElementName = function (value)
 {
    this._rootElementName = value;
};
Object.defineProperty(shetab.common.serialization.SerializationInfo.PropertyInfo.prototype, "rootElementName", {get: shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.get_rootElementName, set: shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.set_rootElementName, enumerable: true});
shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.get_attributeName = function ()
 {
    return this._attributeName;
};
shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.set_attributeName = function (value)
 {
    this._attributeName = value;
};
Object.defineProperty(shetab.common.serialization.SerializationInfo.PropertyInfo.prototype, "attributeName", {get: shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.get_attributeName, set: shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.set_attributeName, enumerable: true});
shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.get_elementName = function ()
 {
    return this._elementName;
};
shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.set_elementName = function (value)
 {
    this._elementName = value;
};
Object.defineProperty(shetab.common.serialization.SerializationInfo.PropertyInfo.prototype, "elementName", {get: shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.get_elementName, set: shetab.common.serialization.SerializationInfo.PropertyInfo.prototype.set_elementName, enumerable: true});
shetab.common.serialization.SerializationInfo.PropertyArrayInfo = function ()
 {
    this.itemInfo = new shetab.common.serialization.SerializationInfo.PropertyInfo();
    this._rootElementName = null;
    this._collectionElementName = null;
    this._itemElementName = null;
};
shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.get_rootElementName = function ()
 {
    return this._rootElementName;
};
shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.set_rootElementName = function (value)
 {
    this._rootElementName = value;
};
Object.defineProperty(shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype, "rootElementName", {get: shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.get_rootElementName, set: shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.set_rootElementName, enumerable: true});
shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.get_collectionElementName = function ()
 {
    return this._collectionElementName;
};
shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.set_collectionElementName = function (value)
 {
    this._collectionElementName = value;
};
Object.defineProperty(shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype, "collectionElementName", {get: shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.get_collectionElementName, set: shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.set_collectionElementName, enumerable: true});
shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.get_itemElementName = function ()
 {
    return this._itemElementName;
};
shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.set_itemElementName = function (value)
 {
    this._itemElementName = value;
};
Object.defineProperty(shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype, "itemElementName", {get: shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.get_itemElementName, set: shetab.common.serialization.SerializationInfo.PropertyArrayInfo.prototype.set_itemElementName, enumerable: true});
shetab.common.serialization.SerializationInfo.PropertyDictionaryInfo = function ()
 {
    this.itemKeyAttributeName = null;
    shetab.common.serialization.SerializationInfo.PropertyArrayInfo.call(this);
};
$Inherit(shetab.common.serialization.SerializationInfo.PropertyDictionaryInfo, shetab.common.serialization.SerializationInfo.PropertyArrayInfo);
shetab.common.serialization.SerializeContext = function ()
 {
};
shetab.common.StringHelper = function ()
 {
};
shetab.common.StringHelper.endsWith = function (str, value, ignoreCase)
 {
    ignoreCase = shetab.common.Utility.checkUndefined(ignoreCase, false);
    if (ignoreCase)
    {
        str = str.toLowerCase();
        value = value.toLowerCase();
    }
    return str.length >= value.length && str.substr(str.length - value.length) === value;
};
shetab.common.StringHelper.startsWith = function (str, value, ignoreCase)
 {
    ignoreCase = shetab.common.Utility.checkUndefined(ignoreCase, false);
    if (ignoreCase)
    {
        str = str.toLowerCase();
        value = value.toLowerCase();
    }
    return str.length >= value.length && str.substr(0, value.length) === value;
};
shetab.common.StringHelper.trim = function (value, characters)
 {
    return shetab.common.StringHelper.trimStart(shetab.common.StringHelper.trimEnd(value, characters), characters);
};
shetab.common.StringHelper.trimStart = function (value, characters)
 {
    characters = shetab.common.Utility.checkUndefined(characters, " ");
    for (var i = 0; i < value.length; i++)
    {
        if (characters.indexOf(value.charAt(i)) === -1)
            return value.substring(i);
    }
    return "";
};
shetab.common.StringHelper.trimEnd = function (value, characters)
 {
    characters = shetab.common.Utility.checkUndefined(characters, " ");
    for (var i = value.length - 1; i >= 0; i--)
    {
        if (characters.indexOf(value.charAt(i)) === -1)
            return value.substring(0, i + 1);
    }
    return "";
};
shetab.common.StringHelper.toCapitalCase = function (value)
 {
    return value.charAt(0).toUpperCase() + value.slice(1);
};
shetab.common.StringHelper.isNullOrEmpty = function (value)
 {
    return value === null || value === "";
};
if (typeof(shetab.common.error) == "undefined")
    shetab.common.error = {};
shetab.common.error.BaseError = function (name, message)
 {
    Error.call(this, message);
    this.name = name;
    this.message = shetab.common.Utility.checkUndefined(message, "");
};
shetab.common.error.BaseError.prototype.toString = function ()
 {
    return this.message !== "" ? this.name + ": " + this.message : this.name;
};
$Inherit(shetab.common.error.BaseError, Error);
shetab.common.error.FileLoadError = function (docUrl)
 {
    this._docUrl = null;


    shetab.common.error.BaseError.call(this, "FileLoadError", "Could not load document. URL: " + docUrl);
    this.set_docUrl(docUrl);
};
shetab.common.error.FileLoadError.prototype.get_docUrl = function ()
 {
    return this._docUrl;
};
shetab.common.error.FileLoadError.prototype.set_docUrl = function (value)
 {
    this._docUrl = value;
};
Object.defineProperty(shetab.common.error.FileLoadError.prototype, "docUrl", {get: shetab.common.error.FileLoadError.prototype.get_docUrl, set: shetab.common.error.FileLoadError.prototype.set_docUrl, enumerable: true});
$Inherit(shetab.common.error.FileLoadError, shetab.common.error.BaseError);
shetab.common.error.FileAccessError = function (docUrl)
 {
    this._docUrl = null;
    shetab.common.error.BaseError.call(this, "UnauthorizedAccessError", "URL: " + docUrl);
    this.set_docUrl(docUrl);
};
shetab.common.error.FileAccessError.prototype.get_docUrl = function ()
 {
    return this._docUrl;
};
shetab.common.error.FileAccessError.prototype.set_docUrl = function (value)
 {
    this._docUrl = value;
};
Object.defineProperty(shetab.common.error.FileAccessError.prototype, "docUrl", {get: shetab.common.error.FileAccessError.prototype.get_docUrl, set: shetab.common.error.FileAccessError.prototype.set_docUrl, enumerable: true});
$Inherit(shetab.common.error.FileAccessError, shetab.common.error.BaseError);
shetab.common.error.NotImplementedError = function ()
 {
    shetab.common.error.BaseError.call(this, shetab.common.error.NotImplementedError.errorName);
};
shetab.common.error.NotImplementedError.errorName = "NotImplementedError";
$Inherit(shetab.common.error.NotImplementedError, shetab.common.error.BaseError);
shetab.common.error.NotSupportedError = function ()
 {
    shetab.common.error.BaseError.call(this, shetab.common.error.NotSupportedError.errorName);
};
shetab.common.error.NotSupportedError.errorName = "NotSupportedError";
$Inherit(shetab.common.error.NotSupportedError, shetab.common.error.BaseError);
shetab.common.error.DoDefaultError = function ()
 {
    shetab.common.error.BaseError.call(this, shetab.common.error.DoDefaultError.errorName);
};
shetab.common.error.DoDefaultError.errorName = "DoDefaultError";
$Inherit(shetab.common.error.DoDefaultError, shetab.common.error.BaseError);
shetab.common.error.NotAvailableError = function ()
 {
    shetab.common.error.BaseError.call(this, shetab.common.error.NotAvailableError.errorName);
};
shetab.common.error.NotAvailableError.errorName = "NotAvailableError";
$Inherit(shetab.common.error.NotAvailableError, shetab.common.error.BaseError);
shetab.common.error.ArgumentOutOfRangeError = function ()
 {
    shetab.common.error.BaseError.call(this, shetab.common.error.ArgumentOutOfRangeError.errorName);
};
shetab.common.error.ArgumentOutOfRangeError.errorName = "ArgumentOutOfRangeError";
$Inherit(shetab.common.error.ArgumentOutOfRangeError, shetab.common.error.BaseError);
shetab.common.Font = function ()
 {
    this.size = "12px";
    this.bold = false;
    this.italic = false;
    this.underline = false;
    this.strikeOut = false;
    this._name = null;
    this._color = null;
};
shetab.common.Font.prototype.get_name = function ()
 {
    return this._name;
};
shetab.common.Font.prototype.set_name = function (value)
 {
    this._name = value;
};
Object.defineProperty(shetab.common.Font.prototype, "name", {get: shetab.common.Font.prototype.get_name, set: shetab.common.Font.prototype.set_name, enumerable: true});
shetab.common.Font.prototype.get_color = function ()
 {
    return this._color;
};
shetab.common.Font.prototype.set_color = function (value)
 {
    this._color = value;
};
Object.defineProperty(shetab.common.Font.prototype, "color", {get: shetab.common.Font.prototype.get_color, set: shetab.common.Font.prototype.set_color, enumerable: true});
shetab.common.Font.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("name");
    info.addString("size");
    info.addBoolean("bold");
    info.addBoolean("italic");
    info.addBoolean("underline");
    info.addBoolean("strikeOut");
    info.add("color",  shetab.common.Color);
};
shetab.common.Font.parseFromXml = function (xml)
 {
    var font = new shetab.common.Font();
    shetab.common.serialization.Serializer.deserialize(font, shetab.common.Xml.loadXmlString(xml).documentElement);
    return font;
};
shetab.common.Font.prototype.toXml = function ()
 {
    var xmlDoc = shetab.common.Xml.createXmlDoc("font");
    shetab.common.serialization.Serializer.serialize(this, xmlDoc.documentElement);
    return shetab.common.Xml.toXmlString(xmlDoc);
};
shetab.common.Font.prototype.toString = function ()
 {
    return this.toXml();
};
if (typeof(shetab.common.resource) == "undefined")
    shetab.common.resource = {};
shetab.common.resource.ResX = function (resXdoc, resXdocUri)
 {
    this._nameMap = null;
    this._nameMap = shetab.common.resource.ResX.loadResX(resXdoc, resXdocUri);
};
shetab.common.resource.ResX.prototype.getString = function (name)
 {
    return this._nameMap.hasOwnProperty(name) ? this._nameMap[name] : null;
};
shetab.common.resource.ResX.loadResX = function (resXdoc, resXdocUri)
 {
    var nameMap = new Object();
    var dataElements = shetab.common.Xml.getElementsByTagName(resXdoc.documentElement, "data");
    for (var $i6 = 0, $l6 = dataElements.length, element = dataElements[$i6]; $i6 < $l6; $i6++, element = dataElements[$i6])
    {
        var valueElement = shetab.common.Xml.selectSingleNode(element, "value");
        var name = shetab.common.Xml._getAttributeString(element, "name", "");
        var type = shetab.common.Xml._getAttributeString(element, "type", "");
        if (name !== "")
        {
            var value = shetab.common.Xml.getElementText(valueElement);
            if (type.indexOf("ResXFileRef") !== -1 && value !== "")
                value = shetab.common.resource.ResX.makeUri(value, resXdocUri);
            nameMap[name] = value;
        }
    }
    return nameMap;
};
shetab.common.resource.ResX.makeUri = function (value, documentUri)
 {
    if (!shetab.common.Uri.isRelative(value))
    {
        var msg = "Error: {0} is not relative path!\nResource Uri: {1}";
        msg = msg.replace("{0}", value);
        msg = msg.replace("{1}", documentUri);
        throw new Error(msg);
    }
    var semicolon = value.indexOf(";");
    if (semicolon !== -1)
        value = value.substr(0, semicolon);
    value = value.replace(new RegExp("\\\\", "g"), "/");
    value = shetab.common.Uri.combine(documentUri, value);
    return value;
};
shetab.common.Foo3 = function ()
 {
};
shetab.common.Foo3.prototype.foo11 = function ()
 {
    var b100 = new String();
};
shetab.common.Foo2 = function ()
 {
    this.myprop = "10";
};
shetab.common.Foo2.prototype.getSerializationInfo = function (info, context)
 {
    info.add("myprop",  String, true);
};
shetab.common.Foo = function ()
 {
    this.testString = null;
    this.test = null;
    this.numbs = new Object();
    this.numbs2 =  [];
    this.foo2 = new shetab.common.Foo2();
    this.font = new shetab.common.Font();
};
shetab.common.Foo.prototype.getSerializationInfo = function (info, context)
 {
    var testInfo = info.addNumber("test", true);
    var numbsInfo = info.addDictionary("numbs",  String, "numb", "key");
    numbsInfo.itemInfo.set_attributeName("vvv");
    var numbs2Info = info.addArray("numbs2",  String, "numb");
    numbs2Info.itemInfo.set_attributeName("value");
    info.add("foo2",  shetab.common.Foo2);
    info.add("font",  shetab.common.Font);
};
shetab.common.Foo.ser = function ()
 {
};
shetab.common.Point = function (x, y)
 {
    this._x = null;
    this._y = null;
    this.set_x(shetab.common.Utility.checkUndefined(x, this.get_x()));
    this.set_y(shetab.common.Utility.checkUndefined(y, this.get_y()));


};
shetab.common.Point.prototype.get_x = function ()
 {
    return this._x;
};
shetab.common.Point.prototype.set_x = function (value)
 {
    this._x = value;
};
Object.defineProperty(shetab.common.Point.prototype, "x", {get: shetab.common.Point.prototype.get_x, set: shetab.common.Point.prototype.set_x, enumerable: true});
shetab.common.Point.prototype.get_y = function ()
 {
    return this._y;
};
shetab.common.Point.prototype.set_y = function (value)
 {
    this._y = value;
};
Object.defineProperty(shetab.common.Point.prototype, "y", {get: shetab.common.Point.prototype.get_y, set: shetab.common.Point.prototype.set_y, enumerable: true});
shetab.common.Point.prototype.toString = function ()
 {
    return this.get_x() + "," + this.get_y();
};
shetab.common.Point.parseFromString = function (value)
 {
    var tokens = value.split(",");
    return new shetab.common.Point(shetab.common.Convert.toNumber(tokens[0]), shetab.common.Convert.toNumber(tokens[1]));
};
shetab.common.Point.prototype.getSerializationInfo = function (info, context)
 {
    info.addNumber("x");
    info.addNumber("y");
};
shetab.common.Size = function (width, height)
 {
    this._width = null;
    this._height = null;
    this.set_width(shetab.common.Utility.checkUndefined(width, this.get_width()));
    this.set_height(shetab.common.Utility.checkUndefined(height, this.get_height()));
};
shetab.common.Size.prototype.get_width = function ()
 {
    return this._width;
};
shetab.common.Size.prototype.set_width = function (value)
 {
    this._width = value;
};
Object.defineProperty(shetab.common.Size.prototype, "width", {get: shetab.common.Size.prototype.get_width, set: shetab.common.Size.prototype.set_width, enumerable: true});
shetab.common.Size.prototype.get_height = function ()
 {
    return this._height;
};
shetab.common.Size.prototype.set_height = function (value)
 {
    this._height = value;
};
Object.defineProperty(shetab.common.Size.prototype, "height", {get: shetab.common.Size.prototype.get_height, set: shetab.common.Size.prototype.set_height, enumerable: true});
shetab.common.Size.prototype.toString = function ()
 {
    return this.get_width() + "," + this.get_height();
};
shetab.common.Size.parseFromString = function (value)
 {
    var tokens = value.split(",");
    return new shetab.common.Size(shetab.common.Convert.toNumber(tokens[0]), shetab.common.Convert.toNumber(tokens[1]));
};
shetab.common.Size.prototype.getSerializationInfo = function (info, context)
 {
    info.addNumber("width");
    info.addNumber("height");
};
shetab.common.Color = function (color)
 {
    this._R = null;
    this._G = null;
    this._B = null;
    this._A = null;
    this.set_A(1);
    if (shetab.common.Utility.isDefined(color))
    {
        var obj = shetab.common.Color.parseFromString(color);
        this.set_R(obj.get_R());
        this.set_G(obj.get_G());
        this.set_B(obj.get_B());
        this.set_A(obj.get_A());
    }
};
shetab.common.Color.prototype.get_R = function ()
 {
    return this._R;
};
shetab.common.Color.prototype.set_R = function (value)
 {
    this._R = value;
};
Object.defineProperty(shetab.common.Color.prototype, "R", {get: shetab.common.Color.prototype.get_R, set: shetab.common.Color.prototype.set_R, enumerable: true});
shetab.common.Color.prototype.get_G = function ()
 {
    return this._G;
};
shetab.common.Color.prototype.set_G = function (value)
 {
    this._G = value;
};
Object.defineProperty(shetab.common.Color.prototype, "G", {get: shetab.common.Color.prototype.get_G, set: shetab.common.Color.prototype.set_G, enumerable: true});
shetab.common.Color.prototype.get_B = function ()
 {
    return this._B;
};
shetab.common.Color.prototype.set_B = function (value)
 {
    this._B = value;
};
Object.defineProperty(shetab.common.Color.prototype, "B", {get: shetab.common.Color.prototype.get_B, set: shetab.common.Color.prototype.set_B, enumerable: true});
shetab.common.Color.prototype.get_A = function ()
 {
    return this._A;
};
shetab.common.Color.prototype.set_A = function (value)
 {
    this._A = value;
};
Object.defineProperty(shetab.common.Color.prototype, "A", {get: shetab.common.Color.prototype.get_A, set: shetab.common.Color.prototype.set_A, enumerable: true});
shetab.common.Color.prototype.toHexRGB = function ()
 {
    return shetab.common.Convert.toStringWithLeadingZero(this.get_R(), 2, 16) + shetab.common.Convert.toStringWithLeadingZero(this.get_G(), 2, 16) + shetab.common.Convert.toStringWithLeadingZero(this.get_B(), 2, 16);
};
shetab.common.Color.prototype.toString = function ()
 {
    return this.get_A() === 1 ? "rgb(" + this.get_R().toString() + "," + this.get_G().toString() + "," + this.get_B().toString() + ")" : "rgba(" + this.get_R().toString() + "," + this.get_G().toString() + "," + this.get_B().toString() + "," + (Math.round(this.get_A() * 100) / 100).toString() + ")";
};
shetab.common.Color.parseFromString = function (value)
 {
    var divElement = document.createElement("div");
    divElement.style.color = value;
    document.head.appendChild(divElement);
    var rgba = window.getComputedStyle(divElement, null).color;
    document.head.removeChild(divElement);
    return shetab.common.Color.parseFromRGBA(rgba);
};
shetab.common.Color.parseFromRGBA = function (value)
 {
    var start = value.indexOf("(");
    var end = value.indexOf(")", start);
    var rgba = value.substring(start + 1, end);
    var ret = new shetab.common.Color();
    var tokens = rgba.split(",");
    if (tokens.length >= 1)
        ret.set_R(parseInt(tokens[0]));
    if (tokens.length >= 2)
        ret.set_G(parseInt(tokens[1]));
    if (tokens.length >= 3)
        ret.set_B(parseInt(tokens[2]));
    if (tokens.length >= 4)
        ret.set_A(parseFloat(tokens[3]));
    return ret;
};
shetab.common.Color.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("R");
    info.addString("G");
    info.addString("B");
    info.addString("A");
};
var JavaScriptExtension = function ()
 {
};
shetab.common.resource.ResourceManager = function ()
 {
    this._resources = new Object();
};
shetab.common.resource.ResourceManager.prototype._getString = function (name, cultureName, checkParentCulture)
 {
    var culture = new shetab.common.CultureInfo(cultureName);
    var ret = this._resources.hasOwnProperty(culture.get_name().toLowerCase()) ? this._resources[culture.get_name().toLowerCase()].getString(name) : null;
    if (ret === null && checkParentCulture && culture.get_parent() !== null)
        ret = this._getString(name, culture.get_parent().get_name(), true);
    return ret;
};
shetab.common.resource.ResourceManager.prototype.getString = function (name, cultureName, defaultCultureName)
 {
    cultureName = shetab.common.Utility.checkUndefined(cultureName, null);
    defaultCultureName = shetab.common.Utility.checkUndefined(defaultCultureName, null);
    if (cultureName !== null)
        cultureName = cultureName.toLowerCase();
    if (defaultCultureName !== null)
        defaultCultureName = defaultCultureName.toLowerCase();
    var ret = cultureName !== null ? this._getString(name, cultureName, true) : null;
    if (ret === null && defaultCultureName !== null && defaultCultureName !== cultureName)
        ret = this._getString(name, defaultCultureName, true);
    if (ret === null && defaultCultureName !== null && defaultCultureName !== "en" && defaultCultureName !== "en-us")
        ret = this._getString(name, "en-us", true);
    return ret;
};
shetab.common.resource.ResourceManager.prototype.addResource = function (cultureName, resXdoc, resXdocUrl)
 {
    this._resources[cultureName.toLowerCase()] = new shetab.common.resource.ResX(resXdoc, resXdocUrl);
};
shetab.common.Uri = function ()
 {
};
shetab.common.Uri.getParent = function (uri)
 {


    if (uri.length >= 3 && uri.substr(uri.length - 3) === "://")
        return null;
    var endIndex = uri.indexOf("?");
    if (endIndex === -1)
        endIndex = uri.indexOf("#");
    if (endIndex === -1)
        endIndex = uri.length;
    var lastSlash = uri.lastIndexOf("/", endIndex);
    return uri.substr(0, lastSlash);
};
shetab.common.Uri.combine = function (uriBase, uriRelative)
 {
    if (uriBase === "")
        return uriRelative;
    if (uriBase.length > 0 && uriBase.charAt(uriBase.length - 1) !== "/")
        uriBase = shetab.common.Uri.getParent(uriBase) + "/";
    return uriBase + uriRelative;
};
shetab.common.Uri.isRelative = function (uri)
 {
    return uri.indexOf("://") === -1;
};
shetab.common.Uri.getQueryString = function (uri, key, defValue)
 {
    defValue = shetab.common.Utility.checkUndefined(defValue, null);
    if (!shetab.common.Utility.isDefined(key))
        return shetab.common.Uri._getQueryString(uri);
     key = key.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
    var regex =  new RegExp('[\\#?&]'+key+'=([^&]*)');
    var qs = regex.exec(uri);
    return qs !== null ? decodeURI(qs[1]) : defValue;
};
shetab.common.Uri._getQueryString = function (uri)
 {
    for (var i = 0; i < uri.length; i++)
    {
        if (uri.charAt(i) === "#" || uri.charAt(i) === "?")
            return uri.substr(i + 1);
    }
    return "";
};
shetab.common.Uri.getUrlWithoutQueryString = function (uri)
 {
    return uri.split("?").shift().split("#").shift();
};
shetab.common.Uri.getFileName = function (uri)
 {
    uri = shetab.common.Uri.getUrlWithoutQueryString(uri);
    return uri.split("/").pop();
};
shetab.common.Uri.getFileNameWithoutExtension = function (uri)
 {
    var fileName = shetab.common.Uri.getFileName(uri);
    var lastDot = fileName.lastIndexOf(".");
    return lastDot === -1 ? fileName : fileName.substr(0, lastDot);
};
shetab.common.Uri.getExtension = function (uri)
 {
    var fileName = shetab.common.Uri.getFileName(uri);
    var lastDot = fileName.lastIndexOf(".");
    return lastDot === -1 ? "" : fileName.substr(lastDot + 1);
};
shetab.common.Uri.getPathName = function (uri)
 {
    var location = document.createElement("a");
    location.href = uri;
    return location.pathname;
};
shetab.common.Utility = function ()
 {
};
shetab.common.Utility.isTypeOf = function (obj, typeCtor)
 {
    return Is(obj, typeCtor);
};
shetab.common.Utility.isDefinedLiteral = function (literal)
 {
    return eval("typeof(" + literal + ")!=undefined");
};
shetab.common.Utility.isDefined = function (obj)
 {
    return typeof(obj) !== "undefined";
};
shetab.common.Utility.isUndefined = function (obj)
 {
    return typeof(obj) === "undefined";
};
shetab.common.Utility.checkUndefined = function (value, defValue)
 {
    return typeof(value) !== "undefined" ? value : defValue;
};
shetab.common.Utility.equals = function (obj1, obj2)
 {
    return  obj1 == obj2;
};
shetab.common.Utility.createObjectByCtor = function (ctor)
 {
    return  new ctor();
};
shetab.common.Utility.proxy = function (fn, context)
 {
     var args = Array.prototype.slice.call(arguments, 2), 
		proxy = function () { 
			return fn.apply(context, args.concat(Array.prototype.slice.call(arguments))); }; 
	return proxy;
};
shetab.common.Utility.checkHttpRequestSuccess = function (status)
 {
    return status >= 200 && status < 300 || status === 304 || status === 0;
};
shetab.common.Utility.getInvalidFileNameChars = function ()
 {
    var ret =  ["<", ">", "|", "", "\t", "/", "\\", "*", ":", "?"];
    for (var i = 0; i < 32; i++)
        ret.push(i);
    return ret;
};
shetab.common.Utility.replaceInvalidFileNameChars = function (fileName, chr)
 {
    chr = shetab.common.Utility.checkUndefined(chr, "_");
    var invalidChars = shetab.common.Utility.getInvalidFileNameChars();
    var ret = "";
    for (var i = 0; i < fileName.length; i++)
    {
        if (invalidChars.indexOf(fileName.charCodeAt(i)) === -1)
            ret += fileName.charAt(i);
        else
            ret += chr;
    }
    return ret;
};
shetab.common.Xml = function ()
 {
};
shetab.common.Xml.createXmlHttpRequest = function ()
 {
    if (typeof( XMLHttpRequest) !== "undefined" || (location.protocol.toLowerCase() === "file:" && typeof( ActiveXObject) !== "undefined"))
    {
        try
        {
            return  new ActiveXObject('MSXML2.XMLHTTP');
        }
        catch ($$e8)
        {
        }
        try
        {
            return  new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch ($$e9)
        {
        }
    }
    return new XMLHttpRequest();
};
shetab.common.Xml.loadFile = function (url, async, loadFileHandler, data)
 {
    data = shetab.common.Utility.checkUndefined(data, null);
    loadFileHandler = shetab.common.Utility.checkUndefined(loadFileHandler, null);
    var httpRequest = shetab.common.Xml.createXmlHttpRequest();
    httpRequest.onreadystatechange = function ()
    {
        if (httpRequest.readyState !== 4)
            return;
        if (loadFileHandler !== null)
            loadFileHandler(httpRequest, data);
    };
    httpRequest.open("GET", url, async);
    httpRequest.send();
    return httpRequest;
};
shetab.common.Xml.createXmlDoc = function (documentElementName)
 {
    return shetab.common.Xml.loadXmlString("<" + documentElementName + "/>");
};
shetab.common.Xml.loadXmlString = function (xml)
 {
    var parser = new DOMParser();
    return parser.parseFromString(xml, "text/xml");
};
shetab.common.Xml.toXmlString = function (element)
 {
    return (new XMLSerializer()).serializeToString(element);
};
shetab.common.Xml.getElementsByTagName = function (element, tagName)
 {
    var ret =  [];
    for (var i = 0; i < element.childNodes.length; i++)
    {
        var node = element.childNodes[i];
        if (node.nodeType === 1 && (node.tagName === tagName || tagName === "*"))
            ret.push(node);
    }
    return ret;
};
shetab.common.Xml.selectSingleNode = function (element, tagName)
 {
    var ret = shetab.common.Xml.getElementsByTagName(element, tagName);
    return ret.length > 0 ? ret[0] : null;
};
shetab.common.Xml.getElementText = function (element)
 {
    for (var i = 0; i < element.childNodes.length; i++)
    {
        var node = element.childNodes[i];
        if (node.nodeType === 3)
            return node.nodeValue;
    }
    return "";
};
shetab.common.Xml.setElementText = function (element, value)
 {
    for (var i = 0; i < element.childNodes.length; i++)
    {
        var node = element.childNodes[i];
        if (node.nodeType === 3)
            node.nodeValue = value;
    }
    element.appendChild(element.ownerDocument.createTextNode(value));
    return "";
};
shetab.common.Xml.getCData = function (element)
 {
    for (var i = 0; i < element.childNodes.length; i++)
    {
        var node = element.childNodes[i];
        if (node.nodeType === 4)
            return node.nodeValue;
    }
    return null;
};
shetab.common.Xml._getAttributeString = function (element, name, defaultValue)
 {
    var attr = element.getAttribute(name);
    return (attr !== null ? attr : defaultValue);
};
shetab.common.Xml._getAttributeBoolean = function (element, name, defaultValue)
 {
    var attr = element.getAttribute(name);
    return attr !== null ? shetab.common.Convert.toBoolean(attr, defaultValue) : defaultValue;
};
shetab.common.Xml._getAttributePoint = function (element, name, defaultValue)
 {
    var attr = element.getAttribute(name);
    return attr !== null ? shetab.common.Convert.toPoint(attr, defaultValue) : defaultValue;
};
shetab.common.Xml._getAttributeSize = function (element, name, defaultValue)
 {
    var attr = element.getAttribute(name);


    return attr !== null ? shetab.common.Convert.toSize(attr, defaultValue) : defaultValue;
};
shetab.common.Xml._getAttributeNumber = function (element, name, defaultValue)
 {
    var attr = element.getAttribute(name);
    return attr !== null ? shetab.common.Convert.toNumber(attr, defaultValue) : defaultValue;
};
shetab.common.Xml.getAttribute = function (element, name, defaultValue)
 {
    if (shetab.common.Utility.isUndefined(defaultValue))
        return shetab.common.Xml._getAttributeString(element, name, null);
    if (shetab.common.Utility.isTypeOf(defaultValue,  String))
        return shetab.common.Xml._getAttributeString(element, name, defaultValue);
    if (shetab.common.Utility.isTypeOf(defaultValue,  Boolean))
        return shetab.common.Xml._getAttributeBoolean(element, name, defaultValue);
    if (shetab.common.Utility.isTypeOf(defaultValue,  Number))
        return shetab.common.Xml._getAttributeNumber(element, name, defaultValue);
    if (shetab.common.Utility.isTypeOf(defaultValue,  shetab.common.Point))
        return shetab.common.Xml._getAttributePoint(element, name, defaultValue);
    if (shetab.common.Utility.isTypeOf(defaultValue,  shetab.common.Size))
        return shetab.common.Xml._getAttributeSize(element, name, defaultValue);
    return defaultValue;
};
if (typeof(shetab) == "undefined")
    var shetab = {};
if (typeof(shetab.ebook) == "undefined")
    shetab.ebook = {};
if (typeof(shetab.ebook.agent) == "undefined")
    shetab.ebook.agent = {};
if (typeof(shetab.ebook.agent.api) == "undefined")
    shetab.ebook.agent.api = {};
shetab.ebook.agent.api.SEApiInvoker = function ()
 {
    this._testProperties = new Object();
    this._context = null;
};
shetab.ebook.agent.api.SEApiInvoker.prototype.invokeGetProperty = function (propertyName, testValue)
 {
    var msg = (function ()
    {
        var $v1 = new shetab.ebook.common.SEMessage();
        $v1.methodName = "getProperty";
        return $v1;
    }).call(this);
    msg.setParam("propertyName", propertyName);
    msg.setParam("testValue", testValue);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SEApiInvoker.prototype.invokeSetProperty = function (propertyName, propertyValue)
 {
    var msg = (function ()
    {
        var $v2 = new shetab.ebook.common.SEMessage();
        $v2.methodName = "setProperty";
        return $v2;
    }).call(this);
    msg.setParam("propertyName", propertyName);
    msg.setParam("propertyValue", propertyValue);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEApiInvoker.prototype.invoke = function (msg)
 {
    var testValue = undefined;
    var testParam = msg.parameters["testValue"];
    if (testParam !== undefined)
    {
        testValue = testParam.value;
        delete msg.parameters["testValue"];
    }
    msg.callerInstanceId = shetab.ebook.agent.SEApp.get_current().get_moduleInstanceId();
    msg.context = this.get_context();
    msg.typeName = this.get_typeName();
    var ret = shetab.ebook.common.SEMessage.prepareResult(shetab.ebook.agent.SEApp.get_current().sendMessageToEngine(msg));
    if (!shetab.ebook.agent.SEApp.get_current().get_isShetabEbookHost() && msg.methodName !== "initializeModule")
        ret = this.invokeMethodTestMode(msg, testValue);
    return ret;
};
shetab.ebook.agent.api.SEApiInvoker.prototype.invokeMethodTestMode = function (msg, testValue)
 {
    if (testValue !== undefined && testValue.length > 0 && testValue.charAt(0) === "@")
    {
        var paramValue = testValue.substr(1);
        if (msg.parameters[paramValue] !== undefined)
            testValue = msg.parameters[paramValue].value;
    }
    var propertyName = msg.getParam("propertyName");
    if (msg.methodName === "setCustomProperty" && propertyName !== null)
        propertyName = "@custom_" + propertyName;
    if (msg.methodName === "setProperty" || msg.methodName === "setCustomProperty")
    {
        var propertyValue = msg.getParam("value");
        var changed = this._testProperties[propertyName] !== propertyValue;
        if (changed)
        {
            this._testProperties[propertyName] = propertyValue;
            shetab.ebook.agent.SEApp.get_current().agent.firePropertiesChanged( [propertyName]);
        }
    }
    if (msg.methodName === "getProperty" || msg.methodName === "getCustomProperty")
    {
        if (shetab.common.Utility.isDefined(this._testProperties[propertyName]))
            return this._testProperties[propertyName];
    }
    return testValue;
};
shetab.ebook.agent.api.SEApiInvoker.prototype.invokeExecuteCommand = function (commandName)
 {
    shetab.ebook.agent.SEApp.get_current().executeCommand(commandName);
};
shetab.ebook.agent.api.SEApiInvoker.prototype.getAllCommandNames = function ()
 {
    return  [];
};
shetab.ebook.agent.api.SEApiInvoker.prototype.get_context = function ()
 {
    return this._context;
};
shetab.ebook.agent.api.SEApiInvoker.prototype.set_context = function (value)
 {
    this._context = value;
};
Object.defineProperty(shetab.ebook.agent.api.SEApiInvoker.prototype, "context", {get: shetab.ebook.agent.api.SEApiInvoker.prototype.get_context, set: shetab.ebook.agent.api.SEApiInvoker.prototype.set_context, enumerable: true});
Object.defineProperty(shetab.ebook.agent.api.SEApiInvoker.prototype, "typeName", {enumerable: true});
shetab.ebook.agent.api.SEPropertyBag = function ()
 {
    shetab.ebook.agent.api.SEApiInvoker.call(this);
};
shetab.ebook.agent.api.SEPropertyBag.prototype.get_typeName = function ()
 {
    return "PropertyBag";
};
Object.defineProperty(shetab.ebook.agent.api.SEPropertyBag.prototype, "typeName", {get: shetab.ebook.agent.api.SEPropertyBag.prototype.get_typeName, enumerable: true});
shetab.ebook.agent.api.SEPropertyBag.prototype.get_schema = function ()
 {
    return this.invokeGetProperty("schema", "");
};
Object.defineProperty(shetab.ebook.agent.api.SEPropertyBag.prototype, "schema", {get: shetab.ebook.agent.api.SEPropertyBag.prototype.get_schema, enumerable: true});
shetab.ebook.agent.api.SEPropertyBag.prototype.getProperty = function (propertyName, itemId, propertySetId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.ebook.agent.api.SEPropertyBag.prototype.setProperty = function (propertyName, value, itemId, propertySetId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.ebook.agent.api.SEPropertyBag.prototype.getProperties = function (itemId, propertySetId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.ebook.agent.api.SEPropertyBag.prototype.getItems = function (propertySetId)
 {
    var msg = (function ()
    {
        var $v3 = new shetab.ebook.common.SEMessage();
        $v3.methodName = "getItems";
        return $v3;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.ebook.common.SEMessage.array_fromString(ret,  String) : null;
};
shetab.ebook.agent.api.SEPropertyBag.prototype.removeItem = function (itemId, propertySetId)
 {
    var msg = (function ()
    {
        var $v4 = new shetab.ebook.common.SEMessage();
        $v4.methodName = "removeItem";
        return $v4;
    }).call(this);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEPropertyBag.prototype.getPropertySetSchema = function (propertySetId)
 {
    var msg = (function ()
    {
        var $v5 = new shetab.ebook.common.SEMessage();
        $v5.methodName = "getPropertySetSchema";
        return $v5;

    }).call(this);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SEPropertyBag.prototype.getPropertyRaw = function (propertyName, itemId, propertySetId)
 {
    var msg = (function ()
    {
        var $v6 = new shetab.ebook.common.SEMessage();
        $v6.methodName = "getPropertyRaw";
        return $v6;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertyName))
        msg.setParam("propertyName", propertyName);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SEPropertyBag.prototype.setPropertyRaw = function (propertyName, value, itemId, propertySetId)
 {
    var msg = (function ()
    {
        var $v7 = new shetab.ebook.common.SEMessage();
        $v7.methodName = "setPropertyRaw";
        return $v7;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertyName))
        msg.setParam("propertyName", propertyName);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", value);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEPropertyBag.prototype.getPropertiesRaw = function (itemId, propertySetId)
 {
    var msg = (function ()
    {
        var $v8 = new shetab.ebook.common.SEMessage();
        $v8.methodName = "getPropertiesRaw";
        return $v8;
    }).call(this);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.ebook.common.SEMessage.dictionary_fromString(ret,  String) : null;
};
shetab.ebook.agent.api.SEPropertyBag.prototype.resetProperty = function (propertyName, itemId, propertySetId)
 {
    var msg = (function ()
    {
        var $v9 = new shetab.ebook.common.SEMessage();
        $v9.methodName = "resetProperty";
        return $v9;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertyName))
        msg.setParam("propertyName", propertyName);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEPropertyBag.prototype.resetAllProperties = function (itemId, propertySetId)
 {
    var msg = (function ()
    {
        var $v10 = new shetab.ebook.common.SEMessage();
        $v10.methodName = "resetAllProperties";
        return $v10;
    }).call(this);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEPropertyBag.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.ebook.agent.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.ebook.agent.api.SEPropertyBag, shetab.ebook.agent.api.SEApiInvoker);
shetab.ebook.agent.api.SEStorage = function ()
 {
    shetab.ebook.agent.api.SEApiInvoker.call(this);
};
shetab.ebook.agent.api.SEStorage.prototype.get_typeName = function ()
 {
    return "Storage";
};
Object.defineProperty(shetab.ebook.agent.api.SEStorage.prototype, "typeName", {get: shetab.ebook.agent.api.SEStorage.prototype.get_typeName, enumerable: true});
shetab.ebook.agent.api.SEStorage.prototype.get_canWrite = function ()
 {
    var ret = this.invokeGetProperty("canWrite", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SEStorage.prototype, "canWrite", {get: shetab.ebook.agent.api.SEStorage.prototype.get_canWrite, enumerable: true});
shetab.ebook.agent.api.SEStorage.prototype.deleteFile = function (fileName, doneCallback)
 {
    var msg = (function ()
    {
        var $v11 = new shetab.ebook.common.SEMessage();
        $v11.methodName = "deleteFile";
        return $v11;
    }).call(this);
    if (shetab.common.Utility.isDefined(fileName))
        msg.setParam("fileName", fileName);
    if (shetab.common.Utility.isDefined(doneCallback))
        msg.setParam("doneCallback", (doneCallback === null) ? null : shetab.ebook.common.SEMessage.getCallbackIdFromFunction(doneCallback));
    this.invoke(msg);
};
shetab.ebook.agent.api.SEStorage.prototype.readBinaryFile = function (fileName, doneCallback)
 {
    var msg = (function ()
    {
        var $v12 = new shetab.ebook.common.SEMessage();
        $v12.methodName = "readBinaryFile";
        return $v12;
    }).call(this);
    if (shetab.common.Utility.isDefined(fileName))
        msg.setParam("fileName", fileName);
    if (shetab.common.Utility.isDefined(doneCallback))
        msg.setParam("doneCallback", (doneCallback === null) ? null : shetab.ebook.common.SEMessage.getCallbackIdFromFunction(doneCallback));
    this.invoke(msg);
};
shetab.ebook.agent.api.SEStorage.prototype.readTextFile = function (fileName, doneCallback)
 {
    var msg = (function ()
    {
        var $v13 = new shetab.ebook.common.SEMessage();
        $v13.methodName = "readTextFile";
        return $v13;
    }).call(this);
    if (shetab.common.Utility.isDefined(fileName))
        msg.setParam("fileName", fileName);
    if (shetab.common.Utility.isDefined(doneCallback))
        msg.setParam("doneCallback", (doneCallback === null) ? null : shetab.ebook.common.SEMessage.getCallbackIdFromFunction(doneCallback));
    this.invoke(msg);
};
shetab.ebook.agent.api.SEStorage.prototype.writeBinaryFile = function (fileName, data, doneCallback)
 {
    var msg = (function ()
    {
        var $v14 = new shetab.ebook.common.SEMessage();
        $v14.methodName = "writeBinaryFile";
        return $v14;
    }).call(this);
    if (shetab.common.Utility.isDefined(fileName))
        msg.setParam("fileName", fileName);
    if (shetab.common.Utility.isDefined(data))
        msg.setParamByteArray("data", data);
    if (shetab.common.Utility.isDefined(doneCallback))
        msg.setParam("doneCallback", (doneCallback === null) ? null : shetab.ebook.common.SEMessage.getCallbackIdFromFunction(doneCallback));
    this.invoke(msg);
};
shetab.ebook.agent.api.SEStorage.prototype.writeTextFile = function (fileName, text, doneCallback)
 {
    var msg = (function ()
    {
        var $v15 = new shetab.ebook.common.SEMessage();
        $v15.methodName = "writeTextFile";
        return $v15;
    }).call(this);
    if (shetab.common.Utility.isDefined(fileName))
        msg.setParam("fileName", fileName);
    if (shetab.common.Utility.isDefined(text))
        msg.setParam("text", text, true);
    if (shetab.common.Utility.isDefined(doneCallback))
        msg.setParam("doneCallback", (doneCallback === null) ? null : shetab.ebook.common.SEMessage.getCallbackIdFromFunction(doneCallback));
    this.invoke(msg);
};
shetab.ebook.agent.api.SEStorage.prototype.getFileUrl = function (fileName, doneCallback)
 {
    var msg = (function ()
    {
        var $v16 = new shetab.ebook.common.SEMessage();
        $v16.methodName = "getFileUrl";
        return $v16;
    }).call(this);
    if (shetab.common.Utility.isDefined(fileName))
        msg.setParam("fileName", fileName);
    if (shetab.common.Utility.isDefined(doneCallback))

        msg.setParam("doneCallback", (doneCallback === null) ? null : shetab.ebook.common.SEMessage.getCallbackIdFromFunction(doneCallback));
    this.invoke(msg);
};
shetab.ebook.agent.api.SEStorage.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.ebook.agent.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.ebook.agent.api.SEStorage, shetab.ebook.agent.api.SEApiInvoker);
shetab.ebook.agent.api.SEInternalCore = function ()
 {
    shetab.ebook.agent.api.SEApiInvoker.call(this);
};
shetab.ebook.agent.api.SEInternalCore.prototype.get_typeName = function ()
 {
    return "InternalCore";
};
Object.defineProperty(shetab.ebook.agent.api.SEInternalCore.prototype, "typeName", {get: shetab.ebook.agent.api.SEInternalCore.prototype.get_typeName, enumerable: true});
shetab.ebook.agent.api.SEInternalCore.prototype.get_selectedItemsXml = function ()
 {
    return this.invokeGetProperty("selectedItemsXml", "");
};
shetab.ebook.agent.api.SEInternalCore.prototype.set_selectedItemsXml = function (value)
 {
    this.invokeSetProperty("selectedItemsXml", value);
};
Object.defineProperty(shetab.ebook.agent.api.SEInternalCore.prototype, "selectedItemsXml", {get: shetab.ebook.agent.api.SEInternalCore.prototype.get_selectedItemsXml, set: shetab.ebook.agent.api.SEInternalCore.prototype.set_selectedItemsXml, enumerable: true});
shetab.ebook.agent.api.SEInternalCore.prototype.getPropertyBagChangeSet = function (moduleEntityId, changeSetId)
 {
    var msg = (function ()
    {
        var $v17 = new shetab.ebook.common.SEMessage();
        $v17.methodName = "getPropertyBagChangeSet";
        return $v17;
    }).call(this);
    if (shetab.common.Utility.isDefined(moduleEntityId))
        msg.setParam("moduleEntityId", moduleEntityId);
    if (shetab.common.Utility.isDefined(changeSetId))
        msg.setParam("changeSetId", changeSetId);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.ebook.common.SEMessage.array_fromString(ret,  shetab.ebook.agent.SEPropertyBagItemProperty) : null;
};
shetab.ebook.agent.api.SEInternalCore.prototype.activateModule = function (value)
 {
    var msg = (function ()
    {
        var $v18 = new shetab.ebook.common.SEMessage();
        $v18.methodName = "activateModule";
        return $v18;
    }).call(this);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", (value === null) ? null : value.toString());
    this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.initializeModule = function (agentVersion, url, parentInstanceId, placeholderId, sessionName)
 {
    var msg = (function ()
    {
        var $v19 = new shetab.ebook.common.SEMessage();
        $v19.methodName = "initializeModule";
        return $v19;
    }).call(this);
    if (shetab.common.Utility.isDefined(agentVersion))
        msg.setParam("agentVersion", agentVersion);
    if (shetab.common.Utility.isDefined(url))
        msg.setParam("url", url);
    if (shetab.common.Utility.isDefined(parentInstanceId))
        msg.setParam("parentInstanceId", parentInstanceId);
    if (shetab.common.Utility.isDefined(placeholderId))
        msg.setParam("placeholderId", placeholderId);
    if (shetab.common.Utility.isDefined(sessionName))
        msg.setParam("sessionName", sessionName);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.uninitializeModule = function ()
 {
    var msg = (function ()
    {
        var $v20 = new shetab.ebook.common.SEMessage();
        $v20.methodName = "uninitializeModule";
        return $v20;
    }).call(this);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.initializeCommandHandler = function (interfaces)
 {
    var msg = (function ()
    {
        var $v21 = new shetab.ebook.common.SEMessage();
        $v21.methodName = "initializeCommandHandler";
        return $v21;
    }).call(this);
    if (shetab.common.Utility.isDefined(interfaces))
        msg.setParam("interfaces", (interfaces === null) ? null : shetab.ebook.common.SEMessage.array_toString(interfaces));
    this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.executeCommand = function (commandName)
 {
    var msg = (function ()
    {
        var $v22 = new shetab.ebook.common.SEMessage();
        $v22.methodName = "executeCommand";
        return $v22;
    }).call(this);
    if (shetab.common.Utility.isDefined(commandName))
        msg.setParam("commandName", commandName);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.addModulePlaceholder = function (placeholderId)
 {
    var msg = (function ()
    {
        var $v23 = new shetab.ebook.common.SEMessage();
        $v23.methodName = "addModulePlaceholder";
        return $v23;
    }).call(this);
    if (shetab.common.Utility.isDefined(placeholderId))
        msg.setParam("placeholderId", placeholderId);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.setProperty = function (propertyName, propertyValue)
 {
    var msg = (function ()
    {
        var $v24 = new shetab.ebook.common.SEMessage();
        $v24.methodName = "setProperty";
        return $v24;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertyName))
        msg.setParam("propertyName", propertyName);
    if (shetab.common.Utility.isDefined(propertyValue))
        msg.setParam("propertyValue", propertyValue);
    this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.getProperty = function (propertyName, testValue)
 {
    var msg = (function ()
    {
        var $v25 = new shetab.ebook.common.SEMessage();
        $v25.methodName = "getProperty";
        return $v25;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertyName))
        msg.setParam("propertyName", propertyName);
    if (shetab.common.Utility.isDefined(testValue))
        msg.setParam("testValue", testValue);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.convertDeprecatedToken = function (tokenName)
 {
    var msg = (function ()
    {
        var $v26 = new shetab.ebook.common.SEMessage();
        $v26.methodName = "convertDeprecatedToken";
        return $v26;
    }).call(this);
    if (shetab.common.Utility.isDefined(tokenName))
        msg.setParam("tokenName", tokenName);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.getModulePropertyXml = function (propertyName, itemId, propertySetId, moduleEntityId)
 {
    var msg = (function ()
    {
        var $v27 = new shetab.ebook.common.SEMessage();
        $v27.methodName = "getModulePropertyXml";
        return $v27;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertyName))
        msg.setParam("propertyName", propertyName);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    if (shetab.common.Utility.isDefined(moduleEntityId))
        msg.setParam("moduleEntityId", moduleEntityId);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SEInternalCore.prototype.getModulePropertiesXml = function (itemId, propertySetId, moduleEntityId)
 {
    var msg = (function ()
    {
        var $v28 = new shetab.ebook.common.SEMessage();
        $v28.methodName = "getModulePropertiesXml";
        return $v28;
    }).call(this);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    if (shetab.common.Utility.isDefined(moduleEntityId))
        msg.setParam("moduleEntityId", moduleEntityId);
    return this.invoke(msg);
};

shetab.ebook.agent.api.SEInternalCore.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.ebook.agent.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.ebook.agent.api.SEInternalCore, shetab.ebook.agent.api.SEApiInvoker);
shetab.ebook.agent.api.SECore = function ()
 {
    shetab.ebook.agent.api.SEApiInvoker.call(this);
};
shetab.ebook.agent.api.SECore.prototype.get_typeName = function ()
 {
    return "Core";
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "typeName", {get: shetab.ebook.agent.api.SECore.prototype.get_typeName, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.openShetabWebsite = function ()
 {
    this.invokeExecuteCommand("openShetabWebsite");
};
shetab.ebook.agent.api.SECore.prototype.exit = function ()
 {
    this.invokeExecuteCommand("exit");
};
shetab.ebook.agent.api.SECore.prototype.unregisterSoftLock = function ()
 {
    this.invokeExecuteCommand("unregisterSoftLock");
};
shetab.ebook.agent.api.SECore.prototype.showDocumentInfo = function ()
 {
    this.invokeExecuteCommand("showDocumentInfo");
};
shetab.ebook.agent.api.SECore.prototype.focusToCommentText = function ()
 {
    this.invokeExecuteCommand("focusToCommentText");
};
shetab.ebook.agent.api.SECore.prototype.hideCommentWindow = function ()
 {
    this.invokeExecuteCommand("hideCommentWindow");
};
shetab.ebook.agent.api.SECore.prototype.showCommentListWindow = function ()
 {
    this.invokeExecuteCommand("showCommentListWindow");
};
shetab.ebook.agent.api.SECore.prototype.showContentsWindow = function ()
 {
    this.invokeExecuteCommand("showContentsWindow");
};
shetab.ebook.agent.api.SECore.prototype.showIndexWindow = function ()
 {
    this.invokeExecuteCommand("showIndexWindow");
};
shetab.ebook.agent.api.SECore.prototype.showFavoritesWindow = function ()
 {
    this.invokeExecuteCommand("showFavoritesWindow");
};
shetab.ebook.agent.api.SECore.prototype.showSearchWindow = function ()
 {
    this.invokeExecuteCommand("showSearchWindow");
};
shetab.ebook.agent.api.SECore.prototype.showHelpWindow = function ()
 {
    this.invokeExecuteCommand("showHelpWindow");
};
shetab.ebook.agent.api.SECore.prototype.showPageSetupWindow = function ()
 {
    this.invokeExecuteCommand("showPageSetupWindow");
};
shetab.ebook.agent.api.SECore.prototype.showFindWindow = function ()
 {
    this.invokeExecuteCommand("showFindWindow");
};
shetab.ebook.agent.api.SECore.prototype.showPrintPreview = function ()
 {
    this.invokeExecuteCommand("showPrintPreview");
};
shetab.ebook.agent.api.SECore.prototype.showAboutWindow = function ()
 {
    this.invokeExecuteCommand("showAboutWindow");
};
shetab.ebook.agent.api.SECore.prototype.showAboutEngineWindow = function ()
 {
    this.invokeExecuteCommand("showAboutEngineWindow");
};
shetab.ebook.agent.api.SECore.prototype.showPrintWindow = function ()
 {
    this.invokeExecuteCommand("showPrintWindow");
};
shetab.ebook.agent.api.SECore.prototype.toggleCommentWindowVisible = function ()
 {
    this.invokeExecuteCommand("toggleCommentWindowVisible");
};
shetab.ebook.agent.api.SECore.prototype.toggleMarkupWindowVisible = function ()
 {
    this.invokeExecuteCommand("toggleMarkupWindowVisible");
};
shetab.ebook.agent.api.SECore.prototype.toggleFullScreen = function ()
 {
    this.invokeExecuteCommand("toggleFullScreen");
};
shetab.ebook.agent.api.SECore.prototype.toggleFullView = function ()
 {
    this.invokeExecuteCommand("toggleFullView");
};
shetab.ebook.agent.api.SECore.prototype.toggleNavigationPanelVisible = function ()
 {
    this.invokeExecuteCommand("toggleNavigationPanelVisible");
};
shetab.ebook.agent.api.SECore.prototype.toggleNavigationPanelAutoHide = function ()
 {
    this.invokeExecuteCommand("toggleNavigationPanelAutoHide");
};
shetab.ebook.agent.api.SECore.prototype.showPropertiesWindow = function ()
 {
    this.invokeExecuteCommand("showPropertiesWindow");
};
shetab.ebook.agent.api.SECore.prototype.showOptionsWindow = function ()
 {
    this.invokeExecuteCommand("showOptionsWindow");
};
shetab.ebook.agent.api.SECore.prototype.zoomIn = function ()
 {
    this.invokeExecuteCommand("zoomIn");
};
shetab.ebook.agent.api.SECore.prototype.zoomOut = function ()
 {
    this.invokeExecuteCommand("zoomOut");
};
shetab.ebook.agent.api.SECore.prototype.zoomActualSize = function ()
 {
    this.invokeExecuteCommand("zoomActualSize");
};
shetab.ebook.agent.api.SECore.prototype.zoomFitPage = function ()
 {
    this.invokeExecuteCommand("zoomFitPage");
};
shetab.ebook.agent.api.SECore.prototype.zoomFitWidth = function ()
 {
    this.invokeExecuteCommand("zoomFitWidth");
};
shetab.ebook.agent.api.SECore.prototype.zoom200 = function ()
 {
    this.invokeExecuteCommand("zoom200");
};
shetab.ebook.agent.api.SECore.prototype.zoom50 = function ()
 {
    this.invokeExecuteCommand("zoom50");
};
shetab.ebook.agent.api.SECore.prototype.addToFavorites = function ()
 {
    this.invokeExecuteCommand("addToFavorites");
};
shetab.ebook.agent.api.SECore.prototype.copyAddress = function ()
 {
    this.invokeExecuteCommand("copyAddress");
};
shetab.ebook.agent.api.SECore.prototype.displayOnePage = function ()
 {
    this.invokeExecuteCommand("displayOnePage");
};
shetab.ebook.agent.api.SECore.prototype.displayTwoPage = function ()
 {
    this.invokeExecuteCommand("displayTwoPage");
};
shetab.ebook.agent.api.SECore.prototype.exportFile = function ()
 {
    this.invokeExecuteCommand("exportFile");
};
shetab.ebook.agent.api.SECore.prototype.refresh = function ()
 {
    this.invokeExecuteCommand("refresh");
};
shetab.ebook.agent.api.SECore.prototype.selectArrowTool = function ()
 {
    this.invokeExecuteCommand("selectArrowTool");
};
shetab.ebook.agent.api.SECore.prototype.selectHandTool = function ()
 {
    this.invokeExecuteCommand("selectHandTool");
};
shetab.ebook.agent.api.SECore.prototype.selectRectangleTool = function ()
 {
    this.invokeExecuteCommand("selectRectangleTool");
};
shetab.ebook.agent.api.SECore.prototype.selectTextBoxTool = function ()
 {
    this.invokeExecuteCommand("selectTextBoxTool");
};
shetab.ebook.agent.api.SECore.prototype.selectPencilTool = function ()
 {
    this.invokeExecuteCommand("selectPencilTool");
};
shetab.ebook.agent.api.SECore.prototype.selectStickyNoteTool = function ()
 {
    this.invokeExecuteCommand("selectStickyNoteTool");
};
shetab.ebook.agent.api.SECore.prototype.selectCrossOutTextTool = function ()
 {
    this.invokeExecuteCommand("selectCrossOutTextTool");
};
shetab.ebook.agent.api.SECore.prototype.selectUnderlineTextTool = function ()
 {
    this.invokeExecuteCommand("selectUnderlineTextTool");
};
shetab.ebook.agent.api.SECore.prototype.selectHighlightTextTool = function ()
 {
    this.invokeExecuteCommand("selectHighlightTextTool");
};
shetab.ebook.agent.api.SECore.prototype.selectHighlightTextRedTool = function ()
 {
    this.invokeExecuteCommand("selectHighlightTextRedTool");
};
shetab.ebook.agent.api.SECore.prototype.selectHighlightTextGreenTool = function ()
 {
    this.invokeExecuteCommand("selectHighlightTextGreenTool");
};
shetab.ebook.agent.api.SECore.prototype.selectTextTipTool = function ()
 {
    this.invokeExecuteCommand("selectTextTipTool");
};
shetab.ebook.agent.api.SECore.prototype.sendSelectionToBack = function ()
 {
    this.invokeExecuteCommand("sendSelectionToBack");
};
shetab.ebook.agent.api.SECore.prototype.bringSelectionToFront = function ()
 {
    this.invokeExecuteCommand("bringSelectionToFront");
};
shetab.ebook.agent.api.SECore.prototype.minimize = function ()
 {
    this.invokeExecuteCommand("minimize");
};
shetab.ebook.agent.api.SECore.prototype.maximize = function ()
 {
    this.invokeExecuteCommand("maximize");
};

shetab.ebook.agent.api.SECore.prototype.navigatePreviousPage = function ()
 {
    this.invokeExecuteCommand("navigatePreviousPage");
};
shetab.ebook.agent.api.SECore.prototype.navigateNextPage = function ()
 {
    this.invokeExecuteCommand("navigateNextPage");
};
shetab.ebook.agent.api.SECore.prototype.navigatePreviousTopic = function ()
 {
    this.invokeExecuteCommand("navigatePreviousTopic");
};
shetab.ebook.agent.api.SECore.prototype.navigateNextTopic = function ()
 {
    this.invokeExecuteCommand("navigateNextTopic");
};
shetab.ebook.agent.api.SECore.prototype.navigateBack = function ()
 {
    this.invokeExecuteCommand("navigateBack");
};
shetab.ebook.agent.api.SECore.prototype.navigateForward = function ()
 {
    this.invokeExecuteCommand("navigateForward");
};
shetab.ebook.agent.api.SECore.prototype.navigateHome = function ()
 {
    this.invokeExecuteCommand("navigateHome");
};
shetab.ebook.agent.api.SECore.prototype.navigateBlank = function ()
 {
    this.invokeExecuteCommand("navigateBlank");
};
shetab.ebook.agent.api.SECore.prototype.selectAll = function ()
 {
    this.invokeExecuteCommand("selectAll");
};
shetab.ebook.agent.api.SECore.prototype.moveSelection = function ()
 {
    this.invokeExecuteCommand("moveSelection");
};
shetab.ebook.agent.api.SECore.prototype.copySelection = function ()
 {
    this.invokeExecuteCommand("copySelection");
};
shetab.ebook.agent.api.SECore.prototype.cutSelection = function ()
 {
    this.invokeExecuteCommand("cutSelection");
};
shetab.ebook.agent.api.SECore.prototype.deleteSelection = function ()
 {
    this.invokeExecuteCommand("deleteSelection");
};
shetab.ebook.agent.api.SECore.prototype.renameSelection = function ()
 {
    this.invokeExecuteCommand("renameSelection");
};
shetab.ebook.agent.api.SECore.prototype.paste = function ()
 {
    this.invokeExecuteCommand("paste");
};
shetab.ebook.agent.api.SECore.prototype.openSelection = function ()
 {
    this.invokeExecuteCommand("openSelection");
};
shetab.ebook.agent.api.SECore.prototype.newFolder = function ()
 {
    this.invokeExecuteCommand("newFolder");
};
shetab.ebook.agent.api.SECore.prototype.moveToPreviousSibling = function ()
 {
    this.invokeExecuteCommand("moveToPreviousSibling");
};
shetab.ebook.agent.api.SECore.prototype.moveToNextSibling = function ()
 {
    this.invokeExecuteCommand("moveToNextSibling");
};
shetab.ebook.agent.api.SECore.prototype.stopMedia = function ()
 {
    this.invokeExecuteCommand("stopMedia");
};
shetab.ebook.agent.api.SECore.prototype.playMedia = function ()
 {
    this.invokeExecuteCommand("playMedia");
};
shetab.ebook.agent.api.SECore.prototype.pauseMedia = function ()
 {
    this.invokeExecuteCommand("pauseMedia");
};
shetab.ebook.agent.api.SECore.prototype.nextMedia = function ()
 {
    this.invokeExecuteCommand("nextMedia");
};
shetab.ebook.agent.api.SECore.prototype.previousMedia = function ()
 {
    this.invokeExecuteCommand("previousMedia");
};
shetab.ebook.agent.api.SECore.prototype.togglePlayMedia = function ()
 {
    this.invokeExecuteCommand("togglePlayMedia");
};
shetab.ebook.agent.api.SECore.prototype.toggleMute = function ()
 {
    this.invokeExecuteCommand("toggleMute");
};
shetab.ebook.agent.api.SECore.prototype.showDeveloperTools = function ()
 {
    this.invokeExecuteCommand("showDeveloperTools");
};
shetab.ebook.agent.api.SECore.prototype.commentSubjectBox = function ()
 {
    this.invokeExecuteCommand("commentSubjectBox");
};
shetab.ebook.agent.api.SECore.prototype.commentTextBox = function ()
 {
    this.invokeExecuteCommand("commentTextBox");
};
shetab.ebook.agent.api.SECore.prototype.commentTimeBox = function ()
 {
    this.invokeExecuteCommand("commentTimeBox");
};
shetab.ebook.agent.api.SECore.prototype.commentAuthorBox = function ()
 {
    this.invokeExecuteCommand("commentAuthorBox");
};
shetab.ebook.agent.api.SECore.prototype.mediaTimerBox = function ()
 {
    this.invokeExecuteCommand("mediaTimerBox");
};
shetab.ebook.agent.api.SECore.prototype.mediaSlider = function ()
 {
    this.invokeExecuteCommand("mediaSlider");
};
shetab.ebook.agent.api.SECore.prototype.volumeSlider = function ()
 {
    this.invokeExecuteCommand("volumeSlider");
};
shetab.ebook.agent.api.SECore.prototype.pageNumberBox = function ()
 {
    this.invokeExecuteCommand("pageNumberBox");
};
shetab.ebook.agent.api.SECore.prototype.pageCountBox = function ()
 {
    this.invokeExecuteCommand("pageCountBox");
};
shetab.ebook.agent.api.SECore.prototype.searchBox = function ()
 {
    this.invokeExecuteCommand("searchBox");
};
shetab.ebook.agent.api.SECore.prototype.restart = function ()
 {
    this.invokeExecuteCommand("restart");
};
shetab.ebook.agent.api.SECore.prototype.test1 = function ()
 {
    this.invokeExecuteCommand("test1");
};
shetab.ebook.agent.api.SECore.prototype.test2 = function ()
 {
    this.invokeExecuteCommand("test2");
};
shetab.ebook.agent.api.SECore.prototype.closePopupWindow = function ()
 {
    this.invokeExecuteCommand("closePopupWindow");
};
shetab.ebook.agent.api.SECore.prototype.get_isExternalPropertyBagNotificationEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.ebook.agent.api.SECore.prototype.set_isExternalPropertyBagNotificationEnabled = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isExternalPropertyBagNotificationEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isExternalPropertyBagNotificationEnabled, set: shetab.ebook.agent.api.SECore.prototype.set_isExternalPropertyBagNotificationEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_moduleInstanceId = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "moduleInstanceId", {get: shetab.ebook.agent.api.SECore.prototype.get_moduleInstanceId, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_moduleEntityId = function ()
 {
    return this.invokeGetProperty("moduleEntityId", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "moduleEntityId", {get: shetab.ebook.agent.api.SECore.prototype.get_moduleEntityId, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_canActive = function ()
 {
    var ret = this.invokeGetProperty("canActive", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_canActive = function (value)
 {
    this.invokeSetProperty("canActive", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "canActive", {get: shetab.ebook.agent.api.SECore.prototype.get_canActive, set: shetab.ebook.agent.api.SECore.prototype.set_canActive, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isActiveModule = function ()
 {
    var ret = this.invokeGetProperty("isActiveModule", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isActiveModule", {get: shetab.ebook.agent.api.SECore.prototype.get_isActiveModule, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isContainsActiveModule = function ()
 {
    var ret = this.invokeGetProperty("isContainsActiveModule", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isContainsActiveModule", {get: shetab.ebook.agent.api.SECore.prototype.get_isContainsActiveModule, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_propertyBag = function ()
 {

    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "propertyBag", {get: shetab.ebook.agent.api.SECore.prototype.get_propertyBag, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_selectedItem = function ()
 {
    var ret = this.invokeGetProperty("selectedItem", "");
    return ret !== null ? shetab.common.serialization.Serializer.serializeFromXml(ret,  shetab.ebook.agent.SESelectedItem) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_selectedItem = function (value)
 {
    this.invokeSetProperty("selectedItem", (value === null) ? null : shetab.common.serialization.Serializer.serializeToXml(value, "SelectedItem"));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "selectedItem", {get: shetab.ebook.agent.api.SECore.prototype.get_selectedItem, set: shetab.ebook.agent.api.SECore.prototype.set_selectedItem, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_selectedItems = function ()
 {
    var ret = this.invokeGetProperty("selectedItems", "");
    return ret !== null ? shetab.ebook.common.SEMessage.array_fromString(ret,  shetab.ebook.agent.SESelectedItem) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_selectedItems = function (value)
 {
    this.invokeSetProperty("selectedItems", (value === null) ? null : shetab.ebook.common.SEMessage.array_toString(value));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "selectedItems", {get: shetab.ebook.agent.api.SECore.prototype.get_selectedItems, set: shetab.ebook.agent.api.SECore.prototype.set_selectedItems, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_sessionStorage = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "sessionStorage", {get: shetab.ebook.agent.api.SECore.prototype.get_sessionStorage, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_localStorage = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "localStorage", {get: shetab.ebook.agent.api.SECore.prototype.get_localStorage, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_moduleEntityStorage = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "moduleEntityStorage", {get: shetab.ebook.agent.api.SECore.prototype.get_moduleEntityStorage, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_moduleStorage = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "moduleStorage", {get: shetab.ebook.agent.api.SECore.prototype.get_moduleStorage, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_projectStorage = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "projectStorage", {get: shetab.ebook.agent.api.SECore.prototype.get_projectStorage, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_projectBooksFolder = function ()
 {
    return this.invokeGetProperty("projectBooksFolder", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "projectBooksFolder", {get: shetab.ebook.agent.api.SECore.prototype.get_projectBooksFolder, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_projectUrl = function ()
 {
    return this.invokeGetProperty("projectUrl", "");
};
shetab.ebook.agent.api.SECore.prototype.set_projectUrl = function (value)
 {
    this.invokeSetProperty("projectUrl", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "projectUrl", {get: shetab.ebook.agent.api.SECore.prototype.get_projectUrl, set: shetab.ebook.agent.api.SECore.prototype.set_projectUrl, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_productName = function ()
 {
    return this.invokeGetProperty("productName", "My Product Name");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "productName", {get: shetab.ebook.agent.api.SECore.prototype.get_productName, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_productVersion = function ()
 {
    return this.invokeGetProperty("productVersion", "1.0");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "productVersion", {get: shetab.ebook.agent.api.SECore.prototype.get_productVersion, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_productCompanyName = function ()
 {
    return this.invokeGetProperty("productCompanyName", "My Corporation");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "productCompanyName", {get: shetab.ebook.agent.api.SECore.prototype.get_productCompanyName, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_productSupportEmail = function ()
 {
    return this.invokeGetProperty("productSupportEmail", "support@mydomain.com");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "productSupportEmail", {get: shetab.ebook.agent.api.SECore.prototype.get_productSupportEmail, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_productSupportUrl = function ()
 {
    return this.invokeGetProperty("productSupportUrl", "http://www.mydomain.com");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "productSupportUrl", {get: shetab.ebook.agent.api.SECore.prototype.get_productSupportUrl, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_productSupportPhone = function ()
 {
    return this.invokeGetProperty("productSupportPhone", "+1-222-333-4444");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "productSupportPhone", {get: shetab.ebook.agent.api.SECore.prototype.get_productSupportPhone, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_productCopyright = function ()
 {
    return this.invokeGetProperty("productCopyright", "Copyright My Corporation. All rights reserved.");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "productCopyright", {get: shetab.ebook.agent.api.SECore.prototype.get_productCopyright, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_productCulture = function ()
 {
    return this.invokeGetProperty("productCulture", "en-us");
};
shetab.ebook.agent.api.SECore.prototype.set_productCulture = function (value)
 {
    this.invokeSetProperty("productCulture", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "productCulture", {get: shetab.ebook.agent.api.SECore.prototype.get_productCulture, set: shetab.ebook.agent.api.SECore.prototype.set_productCulture, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_shetabReaderVersion = function ()
 {
    return this.invokeGetProperty("shetabReaderVersion", "5.0.0");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "shetabReaderVersion", {get: shetab.ebook.agent.api.SECore.prototype.get_shetabReaderVersion, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_windowState = function ()
 {
    return this.invokeGetProperty("windowState", "normal");
};
shetab.ebook.agent.api.SECore.prototype.set_windowState = function (value)
 {
    this.invokeSetProperty("windowState", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "windowState", {get: shetab.ebook.agent.api.SECore.prototype.get_windowState, set: shetab.ebook.agent.api.SECore.prototype.set_windowState, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_visible = function ()
 {

    var ret = this.invokeGetProperty("visible", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_visible = function (value)
 {
    this.invokeSetProperty("visible", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "visible", {get: shetab.ebook.agent.api.SECore.prototype.get_visible, set: shetab.ebook.agent.api.SECore.prototype.set_visible, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_position = function ()
 {
    var ret = this.invokeGetProperty("position", "");
    return ret !== null ? shetab.common.Convert.toPoint(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_position = function (value)
 {
    this.invokeSetProperty("position", (value === null) ? null : shetab.common.serialization.Serializer.serializeToXml(value, "Position"));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "position", {get: shetab.ebook.agent.api.SECore.prototype.get_position, set: shetab.ebook.agent.api.SECore.prototype.set_position, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_size = function ()
 {
    var ret = this.invokeGetProperty("size", "800,600");
    return ret !== null ? shetab.common.Convert.toSize(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_size = function (value)
 {
    this.invokeSetProperty("size", (value === null) ? null : shetab.common.serialization.Serializer.serializeToXml(value, "Size"));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "size", {get: shetab.ebook.agent.api.SECore.prototype.get_size, set: shetab.ebook.agent.api.SECore.prototype.set_size, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_viewSize = function ()
 {
    var ret = this.invokeGetProperty("viewSize", "600,400");
    return ret !== null ? shetab.common.Convert.toSize(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "viewSize", {get: shetab.ebook.agent.api.SECore.prototype.get_viewSize, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_maxSize = function ()
 {
    var ret = this.invokeGetProperty("maxSize", "10000,10000");
    return ret !== null ? shetab.common.Convert.toSize(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_maxSize = function (value)
 {
    this.invokeSetProperty("maxSize", (value === null) ? null : shetab.common.serialization.Serializer.serializeToXml(value, "MaxSize"));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "maxSize", {get: shetab.ebook.agent.api.SECore.prototype.get_maxSize, set: shetab.ebook.agent.api.SECore.prototype.set_maxSize, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isShortcutMenuEnabled = function ()
 {
    var ret = this.invokeGetProperty("isShortcutMenuEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_isShortcutMenuEnabled = function (value)
 {
    this.invokeSetProperty("isShortcutMenuEnabled", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isShortcutMenuEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isShortcutMenuEnabled, set: shetab.ebook.agent.api.SECore.prototype.set_isShortcutMenuEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_minSize = function ()
 {
    var ret = this.invokeGetProperty("minSize", "");
    return ret !== null ? shetab.common.Convert.toSize(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_minSize = function (value)
 {
    this.invokeSetProperty("minSize", (value === null) ? null : shetab.common.serialization.Serializer.serializeToXml(value, "MinSize"));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "minSize", {get: shetab.ebook.agent.api.SECore.prototype.get_minSize, set: shetab.ebook.agent.api.SECore.prototype.set_minSize, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_fullScreen = function ()
 {
    var ret = this.invokeGetProperty("fullScreen", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_fullScreen = function (value)
 {
    this.invokeSetProperty("fullScreen", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "fullScreen", {get: shetab.ebook.agent.api.SECore.prototype.get_fullScreen, set: shetab.ebook.agent.api.SECore.prototype.set_fullScreen, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_fullView = function ()
 {
    var ret = this.invokeGetProperty("fullView", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_fullView = function (value)
 {
    this.invokeSetProperty("fullView", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "fullView", {get: shetab.ebook.agent.api.SECore.prototype.get_fullView, set: shetab.ebook.agent.api.SECore.prototype.set_fullView, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_skinVisible = function ()
 {
    var ret = this.invokeGetProperty("skinVisible", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_skinVisible = function (value)
 {
    this.invokeSetProperty("skinVisible", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "skinVisible", {get: shetab.ebook.agent.api.SECore.prototype.get_skinVisible, set: shetab.ebook.agent.api.SECore.prototype.set_skinVisible, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_readerSkins = function ()
 {
    return this.invokeGetProperty("readerSkins", "");
};
shetab.ebook.agent.api.SECore.prototype.set_readerSkins = function (value)
 {
    this.invokeSetProperty("readerSkins", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "readerSkins", {get: shetab.ebook.agent.api.SECore.prototype.get_readerSkins, set: shetab.ebook.agent.api.SECore.prototype.set_readerSkins, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_skinId = function ()
 {
    return this.invokeGetProperty("skinId", "");
};
shetab.ebook.agent.api.SECore.prototype.set_skinId = function (value)
 {
    this.invokeSetProperty("skinId", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "skinId", {get: shetab.ebook.agent.api.SECore.prototype.get_skinId, set: shetab.ebook.agent.api.SECore.prototype.set_skinId, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_navigationPanelVisible = function ()
 {
    var ret = this.invokeGetProperty("navigationPanelVisible", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_navigationPanelVisible = function (value)
 {
    this.invokeSetProperty("navigationPanelVisible", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "navigationPanelVisible", {get: shetab.ebook.agent.api.SECore.prototype.get_navigationPanelVisible, set: shetab.ebook.agent.api.SECore.prototype.set_navigationPanelVisible, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_navigationPanelLock = function ()
 {
    var ret = this.invokeGetProperty("navigationPanelLock", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_navigationPanelLock = function (value)
 {
    this.invokeSetProperty("navigationPanelLock", (value === null) ? null : value.toString());
};

Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "navigationPanelLock", {get: shetab.ebook.agent.api.SECore.prototype.get_navigationPanelLock, set: shetab.ebook.agent.api.SECore.prototype.set_navigationPanelLock, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_navigationPanelWidth = function ()
 {
    var ret = this.invokeGetProperty("navigationPanelWidth", "50");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_navigationPanelWidth = function (value)
 {
    this.invokeSetProperty("navigationPanelWidth", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "navigationPanelWidth", {get: shetab.ebook.agent.api.SECore.prototype.get_navigationPanelWidth, set: shetab.ebook.agent.api.SECore.prototype.set_navigationPanelWidth, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_navigationPanelAutoHide = function ()
 {
    var ret = this.invokeGetProperty("navigationPanelAutoHide", "false");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_navigationPanelAutoHide = function (value)
 {
    this.invokeSetProperty("navigationPanelAutoHide", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "navigationPanelAutoHide", {get: shetab.ebook.agent.api.SECore.prototype.get_navigationPanelAutoHide, set: shetab.ebook.agent.api.SECore.prototype.set_navigationPanelAutoHide, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_markupWindowVisible = function ()
 {
    var ret = this.invokeGetProperty("markupWindowVisible", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_markupWindowVisible = function (value)
 {
    this.invokeSetProperty("markupWindowVisible", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "markupWindowVisible", {get: shetab.ebook.agent.api.SECore.prototype.get_markupWindowVisible, set: shetab.ebook.agent.api.SECore.prototype.set_markupWindowVisible, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_commentWindowVisible = function ()
 {
    var ret = this.invokeGetProperty("commentWindowVisible", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_commentWindowVisible = function (value)
 {
    this.invokeSetProperty("commentWindowVisible", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "commentWindowVisible", {get: shetab.ebook.agent.api.SECore.prototype.get_commentWindowVisible, set: shetab.ebook.agent.api.SECore.prototype.set_commentWindowVisible, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isEffect3DEnabled = function ()
 {
    var ret = this.invokeGetProperty("isEffect3DEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_isEffect3DEnabled = function (value)
 {
    this.invokeSetProperty("isEffect3DEnabled", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isEffect3DEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isEffect3DEnabled, set: shetab.ebook.agent.api.SECore.prototype.set_isEffect3DEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isEffect3DAvailable = function ()
 {
    var ret = this.invokeGetProperty("isEffect3DAvailable", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isEffect3DAvailable", {get: shetab.ebook.agent.api.SECore.prototype.get_isEffect3DAvailable, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_pageDisplay = function ()
 {
    return this.invokeGetProperty("pageDisplay", "onePage");
};
shetab.ebook.agent.api.SECore.prototype.set_pageDisplay = function (value)
 {
    this.invokeSetProperty("pageDisplay", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "pageDisplay", {get: shetab.ebook.agent.api.SECore.prototype.get_pageDisplay, set: shetab.ebook.agent.api.SECore.prototype.set_pageDisplay, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_highlightSearch = function ()
 {
    var ret = this.invokeGetProperty("highlightSearch", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_highlightSearch = function (value)
 {
    this.invokeSetProperty("highlightSearch", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "highlightSearch", {get: shetab.ebook.agent.api.SECore.prototype.get_highlightSearch, set: shetab.ebook.agent.api.SECore.prototype.set_highlightSearch, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_skinClientLocation = function ()
 {
    var ret = this.invokeGetProperty("skinClientLocation", "");
    return ret !== null ? shetab.common.Convert.toPoint(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_skinClientLocation = function (value)
 {
    this.invokeSetProperty("skinClientLocation", (value === null) ? null : shetab.common.serialization.Serializer.serializeToXml(value, "SkinClientLocation"));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "skinClientLocation", {get: shetab.ebook.agent.api.SECore.prototype.get_skinClientLocation, set: shetab.ebook.agent.api.SECore.prototype.set_skinClientLocation, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_skinClientSize = function ()
 {
    var ret = this.invokeGetProperty("skinClientSize", "");
    return ret !== null ? shetab.common.Convert.toSize(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_skinClientSize = function (value)
 {
    this.invokeSetProperty("skinClientSize", (value === null) ? null : shetab.common.serialization.Serializer.serializeToXml(value, "SkinClientSize"));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "skinClientSize", {get: shetab.ebook.agent.api.SECore.prototype.get_skinClientSize, set: shetab.ebook.agent.api.SECore.prototype.set_skinClientSize, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_skinClientVisible = function ()
 {
    var ret = this.invokeGetProperty("skinClientVisible", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_skinClientVisible = function (value)
 {
    this.invokeSetProperty("skinClientVisible", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "skinClientVisible", {get: shetab.ebook.agent.api.SECore.prototype.get_skinClientVisible, set: shetab.ebook.agent.api.SECore.prototype.set_skinClientVisible, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_skinDesignSize = function ()
 {
    var ret = this.invokeGetProperty("skinDesignSize", "");
    return ret !== null ? shetab.common.Convert.toSize(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_skinDesignSize = function (value)
 {
    this.invokeSetProperty("skinDesignSize", (value === null) ? null : shetab.common.serialization.Serializer.serializeToXml(value, "SkinDesignSize"));
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "skinDesignSize", {get: shetab.ebook.agent.api.SECore.prototype.get_skinDesignSize, set: shetab.ebook.agent.api.SECore.prototype.set_skinDesignSize, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_skinAutoZoom = function ()
 {

    var ret = this.invokeGetProperty("skinAutoZoom", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_skinAutoZoom = function (value)
 {
    this.invokeSetProperty("skinAutoZoom", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "skinAutoZoom", {get: shetab.ebook.agent.api.SECore.prototype.get_skinAutoZoom, set: shetab.ebook.agent.api.SECore.prototype.set_skinAutoZoom, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_skinFile = function ()
 {
    return this.invokeGetProperty("skinFile", "");
};
shetab.ebook.agent.api.SECore.prototype.set_skinFile = function (value)
 {
    this.invokeSetProperty("skinFile", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "skinFile", {get: shetab.ebook.agent.api.SECore.prototype.get_skinFile, set: shetab.ebook.agent.api.SECore.prototype.set_skinFile, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_contentsViewLink = function ()
 {
    return this.invokeGetProperty("contentsViewLink", "");
};
shetab.ebook.agent.api.SECore.prototype.set_contentsViewLink = function (value)
 {
    this.invokeSetProperty("contentsViewLink", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "contentsViewLink", {get: shetab.ebook.agent.api.SECore.prototype.get_contentsViewLink, set: shetab.ebook.agent.api.SECore.prototype.set_contentsViewLink, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_defaultContentsViewLink = function ()
 {
    return this.invokeGetProperty("defaultContentsViewLink", "");
};
shetab.ebook.agent.api.SECore.prototype.set_defaultContentsViewLink = function (value)
 {
    this.invokeSetProperty("defaultContentsViewLink", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "defaultContentsViewLink", {get: shetab.ebook.agent.api.SECore.prototype.get_defaultContentsViewLink, set: shetab.ebook.agent.api.SECore.prototype.set_defaultContentsViewLink, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isDiagnosticsInfoEnabled = function ()
 {
    var ret = this.invokeGetProperty("isDiagnosticsInfoEnabled", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_isDiagnosticsInfoEnabled = function (value)
 {
    this.invokeSetProperty("isDiagnosticsInfoEnabled", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isDiagnosticsInfoEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isDiagnosticsInfoEnabled, set: shetab.ebook.agent.api.SECore.prototype.set_isDiagnosticsInfoEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_soundVolume = function ()
 {
    var ret = this.invokeGetProperty("soundVolume", "70");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_soundVolume = function (value)
 {
    this.invokeSetProperty("soundVolume", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "soundVolume", {get: shetab.ebook.agent.api.SECore.prototype.get_soundVolume, set: shetab.ebook.agent.api.SECore.prototype.set_soundVolume, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_mute = function ()
 {
    var ret = this.invokeGetProperty("mute", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_mute = function (value)
 {
    this.invokeSetProperty("mute", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "mute", {get: shetab.ebook.agent.api.SECore.prototype.get_mute, set: shetab.ebook.agent.api.SECore.prototype.set_mute, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_commentSubject = function ()
 {
    return this.invokeGetProperty("commentSubject", "");
};
shetab.ebook.agent.api.SECore.prototype.set_commentSubject = function (value)
 {
    this.invokeSetProperty("commentSubject", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "commentSubject", {get: shetab.ebook.agent.api.SECore.prototype.get_commentSubject, set: shetab.ebook.agent.api.SECore.prototype.set_commentSubject, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_commentAuthor = function ()
 {
    return this.invokeGetProperty("commentAuthor", "");
};
shetab.ebook.agent.api.SECore.prototype.set_commentAuthor = function (value)
 {
    this.invokeSetProperty("commentAuthor", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "commentAuthor", {get: shetab.ebook.agent.api.SECore.prototype.get_commentAuthor, set: shetab.ebook.agent.api.SECore.prototype.set_commentAuthor, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_commentText = function ()
 {
    return this.invokeGetProperty("commentText", "");
};
shetab.ebook.agent.api.SECore.prototype.set_commentText = function (value)
 {
    this.invokeSetProperty("commentText", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "commentText", {get: shetab.ebook.agent.api.SECore.prototype.get_commentText, set: shetab.ebook.agent.api.SECore.prototype.set_commentText, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_commentTime = function ()
 {
    return this.invokeGetProperty("commentTime", "");
};
shetab.ebook.agent.api.SECore.prototype.set_commentTime = function (value)
 {
    this.invokeSetProperty("commentTime", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "commentTime", {get: shetab.ebook.agent.api.SECore.prototype.get_commentTime, set: shetab.ebook.agent.api.SECore.prototype.set_commentTime, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_pageLabel = function ()
 {
    return this.invokeGetProperty("pageLabel", "");
};
shetab.ebook.agent.api.SECore.prototype.set_pageLabel = function (value)
 {
    this.invokeSetProperty("pageLabel", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "pageLabel", {get: shetab.ebook.agent.api.SECore.prototype.get_pageLabel, set: shetab.ebook.agent.api.SECore.prototype.set_pageLabel, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_pageCount = function ()
 {
    var ret = this.invokeGetProperty("pageCount", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "pageCount", {get: shetab.ebook.agent.api.SECore.prototype.get_pageCount, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_searchQuery = function ()
 {
    return this.invokeGetProperty("searchQuery", "");
};
shetab.ebook.agent.api.SECore.prototype.set_searchQuery = function (value)
 {
    this.invokeSetProperty("searchQuery", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "searchQuery", {get: shetab.ebook.agent.api.SECore.prototype.get_searchQuery, set: shetab.ebook.agent.api.SECore.prototype.set_searchQuery, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_zoom = function ()
 {
    var ret = this.invokeGetProperty("zoom", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_zoom = function (value)
 {
    this.invokeSetProperty("zoom", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "zoom", {get: shetab.ebook.agent.api.SECore.prototype.get_zoom, set: shetab.ebook.agent.api.SECore.prototype.set_zoom, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_zoomMode = function ()
 {
    return this.invokeGetProperty("zoomMode", "fitWidth");

};
shetab.ebook.agent.api.SECore.prototype.set_zoomMode = function (value)
 {
    this.invokeSetProperty("zoomMode", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "zoomMode", {get: shetab.ebook.agent.api.SECore.prototype.get_zoomMode, set: shetab.ebook.agent.api.SECore.prototype.set_zoomMode, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_uiCulture = function ()
 {
    return this.invokeGetProperty("uiCulture", "en-us");
};
shetab.ebook.agent.api.SECore.prototype.set_uiCulture = function (value)
 {
    this.invokeSetProperty("uiCulture", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "uiCulture", {get: shetab.ebook.agent.api.SECore.prototype.get_uiCulture, set: shetab.ebook.agent.api.SECore.prototype.set_uiCulture, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isCommentSubjectEnabled = function ()
 {
    var ret = this.invokeGetProperty("isCommentSubjectEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isCommentSubjectEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isCommentSubjectEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isCommentAuthorEnabled = function ()
 {
    var ret = this.invokeGetProperty("isCommentAuthorEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isCommentAuthorEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isCommentAuthorEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isCommentTextEnabled = function ()
 {
    var ret = this.invokeGetProperty("isCommentTextEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isCommentTextEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isCommentTextEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isCommentTimeEnabled = function ()
 {
    var ret = this.invokeGetProperty("isCommentTimeEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isCommentTimeEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isCommentTimeEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isPageLabelEnabled = function ()
 {
    var ret = this.invokeGetProperty("isPageLabelEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isPageLabelEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isPageLabelEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isPageCountEnabled = function ()
 {
    var ret = this.invokeGetProperty("isPageCountEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isPageCountEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isPageCountEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isSearchQueryEnabled = function ()
 {
    var ret = this.invokeGetProperty("isSearchQueryEnabled", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isSearchQueryEnabled", {get: shetab.ebook.agent.api.SECore.prototype.get_isSearchQueryEnabled, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_topics = function ()
 {
    return this.invokeGetProperty("topics", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "topics", {get: shetab.ebook.agent.api.SECore.prototype.get_topics, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_currentTopicId = function ()
 {
    return this.invokeGetProperty("currentTopicId", "");
};
shetab.ebook.agent.api.SECore.prototype.set_currentTopicId = function (value)
 {
    this.invokeSetProperty("currentTopicId", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "currentTopicId", {get: shetab.ebook.agent.api.SECore.prototype.get_currentTopicId, set: shetab.ebook.agent.api.SECore.prototype.set_currentTopicId, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_selectedTopicId = function ()
 {
    return this.invokeGetProperty("selectedTopicId", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "selectedTopicId", {get: shetab.ebook.agent.api.SECore.prototype.get_selectedTopicId, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_currentRootTopicId = function ()
 {
    return this.invokeGetProperty("currentRootTopicId", "");
};
shetab.ebook.agent.api.SECore.prototype.set_currentRootTopicId = function (value)
 {
    this.invokeSetProperty("currentRootTopicId", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "currentRootTopicId", {get: shetab.ebook.agent.api.SECore.prototype.get_currentRootTopicId, set: shetab.ebook.agent.api.SECore.prototype.set_currentRootTopicId, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_documentUrl = function ()
 {
    return this.invokeGetProperty("documentUrl", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "documentUrl", {get: shetab.ebook.agent.api.SECore.prototype.get_documentUrl, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_documentLink = function ()
 {
    return this.invokeGetProperty("documentLink", "");
};
shetab.ebook.agent.api.SECore.prototype.set_documentLink = function (value)
 {
    this.invokeSetProperty("documentLink", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "documentLink", {get: shetab.ebook.agent.api.SECore.prototype.get_documentLink, set: shetab.ebook.agent.api.SECore.prototype.set_documentLink, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_mediaPosition = function ()
 {
    var ret = this.invokeGetProperty("mediaPosition", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_mediaPosition = function (value)
 {
    this.invokeSetProperty("mediaPosition", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "mediaPosition", {get: shetab.ebook.agent.api.SECore.prototype.get_mediaPosition, set: shetab.ebook.agent.api.SECore.prototype.set_mediaPosition, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_mediaState = function ()
 {
    return this.invokeGetProperty("mediaState", "");
};
shetab.ebook.agent.api.SECore.prototype.set_mediaState = function (value)
 {
    this.invokeSetProperty("mediaState", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "mediaState", {get: shetab.ebook.agent.api.SECore.prototype.get_mediaState, set: shetab.ebook.agent.api.SECore.prototype.set_mediaState, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_mediaLength = function ()
 {
    var ret = this.invokeGetProperty("mediaLength", "5400000");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "mediaLength", {get: shetab.ebook.agent.api.SECore.prototype.get_mediaLength, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isMediaOpen = function ()
 {
    var ret = this.invokeGetProperty("isMediaOpen", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};

Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isMediaOpen", {get: shetab.ebook.agent.api.SECore.prototype.get_isMediaOpen, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isMediaPlaying = function ()
 {
    var ret = this.invokeGetProperty("isMediaPlaying", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_isMediaPlaying = function (value)
 {
    this.invokeSetProperty("isMediaPlaying", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isMediaPlaying", {get: shetab.ebook.agent.api.SECore.prototype.get_isMediaPlaying, set: shetab.ebook.agent.api.SECore.prototype.set_isMediaPlaying, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isMediaPaused = function ()
 {
    var ret = this.invokeGetProperty("isMediaPaused", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isMediaPaused", {get: shetab.ebook.agent.api.SECore.prototype.get_isMediaPaused, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isMediaStopped = function ()
 {
    var ret = this.invokeGetProperty("isMediaStopped", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isMediaStopped", {get: shetab.ebook.agent.api.SECore.prototype.get_isMediaStopped, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_showAboutEngineMenu = function ()
 {
    var ret = this.invokeGetProperty("showAboutEngineMenu", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_showAboutEngineMenu = function (value)
 {
    this.invokeSetProperty("showAboutEngineMenu", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "showAboutEngineMenu", {get: shetab.ebook.agent.api.SECore.prototype.get_showAboutEngineMenu, set: shetab.ebook.agent.api.SECore.prototype.set_showAboutEngineMenu, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_flowDirection = function ()
 {
    return this.invokeGetProperty("flowDirection", "ltr");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "flowDirection", {get: shetab.ebook.agent.api.SECore.prototype.get_flowDirection, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_uiFlowDirection = function ()
 {
    return this.invokeGetProperty("uiFlowDirection", "ltr");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "uiFlowDirection", {get: shetab.ebook.agent.api.SECore.prototype.get_uiFlowDirection, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isShetabEbookHost = function ()
 {
    var ret = this.invokeGetProperty("isShetabEbookHost", "false");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isShetabEbookHost", {get: shetab.ebook.agent.api.SECore.prototype.get_isShetabEbookHost, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isTestMode = function ()
 {
    var ret = this.invokeGetProperty("isTestMode", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isTestMode", {get: shetab.ebook.agent.api.SECore.prototype.get_isTestMode, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_moduleFile = function ()
 {
    return this.invokeGetProperty("moduleFile", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "moduleFile", {get: shetab.ebook.agent.api.SECore.prototype.get_moduleFile, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_moduleFolder = function ()
 {
    return this.invokeGetProperty("moduleFolder", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "moduleFolder", {get: shetab.ebook.agent.api.SECore.prototype.get_moduleFolder, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_enableUpdateView = function ()
 {
    var ret = this.invokeGetProperty("enableUpdateView", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_enableUpdateView = function (value)
 {
    this.invokeSetProperty("enableUpdateView", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "enableUpdateView", {get: shetab.ebook.agent.api.SECore.prototype.get_enableUpdateView, set: shetab.ebook.agent.api.SECore.prototype.set_enableUpdateView, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_enableFocus = function ()
 {
    var ret = this.invokeGetProperty("enableFocus", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_enableFocus = function (value)
 {
    this.invokeSetProperty("enableFocus", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "enableFocus", {get: shetab.ebook.agent.api.SECore.prototype.get_enableFocus, set: shetab.ebook.agent.api.SECore.prototype.set_enableFocus, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_isDesignMode = function ()
 {
    var ret = this.invokeGetProperty("isDesignMode", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "isDesignMode", {get: shetab.ebook.agent.api.SECore.prototype.get_isDesignMode, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_plugins = function ()
 {
    return this.invokeGetProperty("plugins", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "plugins", {get: shetab.ebook.agent.api.SECore.prototype.get_plugins, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_selectedBookId = function ()
 {
    return this.invokeGetProperty("selectedBookId", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "selectedBookId", {get: shetab.ebook.agent.api.SECore.prototype.get_selectedBookId, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_rootBookId = function ()
 {
    return this.invokeGetProperty("rootBookId", "");
};
shetab.ebook.agent.api.SECore.prototype.set_rootBookId = function (value)
 {
    this.invokeSetProperty("rootBookId", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "rootBookId", {get: shetab.ebook.agent.api.SECore.prototype.get_rootBookId, set: shetab.ebook.agent.api.SECore.prototype.set_rootBookId, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_books = function ()
 {
    return this.invokeGetProperty("books", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "books", {get: shetab.ebook.agent.api.SECore.prototype.get_books, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_shetabWebSiteUrl = function ()
 {
    return this.invokeGetProperty("shetabWebSiteUrl", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "shetabWebSiteUrl", {get: shetab.ebook.agent.api.SECore.prototype.get_shetabWebSiteUrl, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.get_mediaPositionGrabMode = function ()
 {
    var ret = this.invokeGetProperty("mediaPositionGrabMode", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.set_mediaPositionGrabMode = function (value)
 {
    this.invokeSetProperty("mediaPositionGrabMode", (value === null) ? null : value.toString());
};

Object.defineProperty(shetab.ebook.agent.api.SECore.prototype, "mediaPositionGrabMode", {get: shetab.ebook.agent.api.SECore.prototype.get_mediaPositionGrabMode, set: shetab.ebook.agent.api.SECore.prototype.set_mediaPositionGrabMode, enumerable: true});
shetab.ebook.agent.api.SECore.prototype.getPropertyBag = function (moduleEntityId, doneCallback)
 {
    var msg = (function ()
    {
        var $v29 = new shetab.ebook.common.SEMessage();
        $v29.methodName = "getPropertyBag";
        return $v29;
    }).call(this);
    if (shetab.common.Utility.isDefined(moduleEntityId))
        msg.setParam("moduleEntityId", moduleEntityId);
    if (shetab.common.Utility.isDefined(doneCallback))
        msg.setParam("doneCallback", (doneCallback === null) ? null : shetab.ebook.common.SEMessage.getCallbackIdFromFunction(doneCallback));
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.setSelectedItem = function (itemId, propertySetId)
 {
    var msg = (function ()
    {
        var $v30 = new shetab.ebook.common.SEMessage();
        $v30.methodName = "setSelectedItem";
        return $v30;
    }).call(this);
    if (shetab.common.Utility.isDefined(itemId))
        msg.setParam("itemId", itemId);
    if (shetab.common.Utility.isDefined(propertySetId))
        msg.setParam("propertySetId", propertySetId);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getDocumentInfoByLink = function (link)
 {
    var msg = (function ()
    {
        var $v31 = new shetab.ebook.common.SEMessage();
        $v31.methodName = "getDocumentInfoByLink";
        return $v31;
    }).call(this);
    if (shetab.common.Utility.isDefined(link))
        msg.setParam("link", link);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.serialization.Serializer.serializeFromXml(ret,  shetab.ebook.agent.SEDocumentInfo) : null;
};
shetab.ebook.agent.api.SECore.prototype.getDocumentInfoByUrl = function (url)
 {
    var msg = (function ()
    {
        var $v32 = new shetab.ebook.common.SEMessage();
        $v32.methodName = "getDocumentInfoByUrl";
        return $v32;
    }).call(this);
    if (shetab.common.Utility.isDefined(url))
        msg.setParam("url", url);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.serialization.Serializer.serializeFromXml(ret,  shetab.ebook.agent.SEDocumentInfo) : null;
};
shetab.ebook.agent.api.SECore.prototype.index = function (queryString, locateIndex)
 {
    var msg = (function ()
    {
        var $v33 = new shetab.ebook.common.SEMessage();
        $v33.methodName = "index";
        return $v33;
    }).call(this);
    if (shetab.common.Utility.isDefined(queryString))
        msg.setParam("queryString", queryString);
    if (shetab.common.Utility.isDefined(locateIndex))
        msg.setParam("locateIndex", (locateIndex === null) ? null : locateIndex.toString());
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.openUrl = function (url, parameters)
 {
    var msg = (function ()
    {
        var $v34 = new shetab.ebook.common.SEMessage();
        $v34.methodName = "openUrl";
        return $v34;
    }).call(this);
    if (shetab.common.Utility.isDefined(url))
        msg.setParam("url", url);
    if (shetab.common.Utility.isDefined(parameters))
        msg.setParam("parameters", parameters);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.search = function (queryString, startIndex, resultCount)
 {
    var msg = (function ()
    {
        var $v35 = new shetab.ebook.common.SEMessage();
        $v35.methodName = "search";
        return $v35;
    }).call(this);
    if (shetab.common.Utility.isDefined(queryString))
        msg.setParam("queryString", queryString);
    if (shetab.common.Utility.isDefined(startIndex))
        msg.setParam("startIndex", (startIndex === null) ? null : startIndex.toString());
    if (shetab.common.Utility.isDefined(resultCount))
        msg.setParam("resultCount", (resultCount === null) ? null : resultCount.toString());
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getPromptFont = function (initFont)
 {
    var msg = (function ()
    {
        var $v36 = new shetab.ebook.common.SEMessage();
        $v36.methodName = "getPromptFont";
        return $v36;
    }).call(this);
    if (shetab.common.Utility.isDefined(initFont))
        msg.setParam("initFont", (initFont === null) ? null : shetab.common.serialization.Serializer.serializeToXml(initFont, "InitFont"));
    msg.setParam("testValue", "@initFont");
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.serialization.Serializer.serializeFromXml(ret,  shetab.common.Font) : null;
};
shetab.ebook.agent.api.SECore.prototype.getPromptColor = function (initColor)
 {
    var msg = (function ()
    {
        var $v37 = new shetab.ebook.common.SEMessage();
        $v37.methodName = "getPromptColor";
        return $v37;
    }).call(this);
    if (shetab.common.Utility.isDefined(initColor))
        msg.setParam("initColor", (initColor === null) ? null : shetab.common.serialization.Serializer.serializeToXml(initColor, "InitColor"));
    msg.setParam("testValue", "@initColor");
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toColor(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.exportFiles = function (links)
 {
    var msg = (function ()
    {
        var $v38 = new shetab.ebook.common.SEMessage();
        $v38.methodName = "exportFiles";
        return $v38;
    }).call(this);
    if (shetab.common.Utility.isDefined(links))
        msg.setParam("links", links);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.printFiles = function (links)
 {
    var msg = (function ()
    {
        var $v39 = new shetab.ebook.common.SEMessage();
        $v39.methodName = "printFiles";
        return $v39;
    }).call(this);
    if (shetab.common.Utility.isDefined(links))
        msg.setParam("links", links);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.navigateDocument = function (link, keepSound, highlightKeywords)
 {
    var msg = (function ()
    {
        var $v40 = new shetab.ebook.common.SEMessage();
        $v40.methodName = "navigateDocument";
        return $v40;
    }).call(this);
    if (shetab.common.Utility.isDefined(link))
        msg.setParam("link", link);
    if (shetab.common.Utility.isDefined(keepSound))
        msg.setParam("keepSound", (keepSound === null) ? null : keepSound.toString());
    if (shetab.common.Utility.isDefined(highlightKeywords))
        msg.setParam("highlightKeywords", highlightKeywords);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.navigatePageLabel = function (label)
 {
    var msg = (function ()
    {
        var $v41 = new shetab.ebook.common.SEMessage();
        $v41.methodName = "navigatePageLabel";
        return $v41;
    }).call(this);
    if (shetab.common.Utility.isDefined(label))
        msg.setParam("label", label);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.playSound = function (link, backgroundMode, loopSound)
 {
    var msg = (function ()
    {
        var $v42 = new shetab.ebook.common.SEMessage();
        $v42.methodName = "playSound";
        return $v42;
    }).call(this);
    if (shetab.common.Utility.isDefined(link))
        msg.setParam("link", link);
    if (shetab.common.Utility.isDefined(backgroundMode))
        msg.setParam("backgroundMode", (backgroundMode === null) ? null : backgroundMode.toString());
    if (shetab.common.Utility.isDefined(loopSound))
        msg.setParam("loopSound", (loopSound === null) ? null : loopSound.toString());
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.localizeText = function (text)
 {
    var msg = (function ()
    {

        var $v43 = new shetab.ebook.common.SEMessage();
        $v43.methodName = "localizeText";
        return $v43;
    }).call(this);
    if (shetab.common.Utility.isDefined(text))
        msg.setParam("text", text, true);
    msg.setParam("testValue", "@text");
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getUrlFromLink = function (link)
 {
    var msg = (function ()
    {
        var $v44 = new shetab.ebook.common.SEMessage();
        $v44.methodName = "getUrlFromLink";
        return $v44;
    }).call(this);
    if (shetab.common.Utility.isDefined(link))
        msg.setParam("link", link);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getLinkFromUrl = function (link)
 {
    var msg = (function ()
    {
        var $v45 = new shetab.ebook.common.SEMessage();
        $v45.methodName = "getLinkFromUrl";
        return $v45;
    }).call(this);
    if (shetab.common.Utility.isDefined(link))
        msg.setParam("link", link);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getResource = function (resourceFile, resourceKey)
 {
    var msg = (function ()
    {
        var $v46 = new shetab.ebook.common.SEMessage();
        $v46.methodName = "getResource";
        return $v46;
    }).call(this);
    if (shetab.common.Utility.isDefined(resourceFile))
        msg.setParam("resourceFile", resourceFile);
    if (shetab.common.Utility.isDefined(resourceKey))
        msg.setParam("resourceKey", resourceKey);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getPromptFolder = function (initFolder, rootFolder, title)
 {
    var msg = (function ()
    {
        var $v47 = new shetab.ebook.common.SEMessage();
        $v47.methodName = "getPromptFolder";
        return $v47;
    }).call(this);
    if (shetab.common.Utility.isDefined(initFolder))
        msg.setParam("initFolder", initFolder);
    if (shetab.common.Utility.isDefined(rootFolder))
        msg.setParam("rootFolder", rootFolder);
    if (shetab.common.Utility.isDefined(title))
        msg.setParam("title", title);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getPromptFileOpen = function (fileName, filter)
 {
    var msg = (function ()
    {
        var $v48 = new shetab.ebook.common.SEMessage();
        $v48.methodName = "getPromptFileOpen";
        return $v48;
    }).call(this);
    if (shetab.common.Utility.isDefined(fileName))
        msg.setParam("fileName", fileName);
    if (shetab.common.Utility.isDefined(filter))
        msg.setParam("filter", filter);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.sendCustomNotify = function (customNotifyName, customNotifyValue)
 {
    var msg = (function ()
    {
        var $v49 = new shetab.ebook.common.SEMessage();
        $v49.methodName = "sendCustomNotify";
        return $v49;
    }).call(this);
    if (shetab.common.Utility.isDefined(customNotifyName))
        msg.setParam("customNotifyName", customNotifyName);
    if (shetab.common.Utility.isDefined(customNotifyValue))
        msg.setParam("customNotifyValue", customNotifyValue);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getTopicIdBookOwner = function (topicId)
 {
    var msg = (function ()
    {
        var $v50 = new shetab.ebook.common.SEMessage();
        $v50.methodName = "getTopicIdBookOwner";
        return $v50;
    }).call(this);
    if (shetab.common.Utility.isDefined(topicId))
        msg.setParam("topicId", topicId);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.getTopic = function (topicId)
 {
    var msg = (function ()
    {
        var $v51 = new shetab.ebook.common.SEMessage();
        $v51.methodName = "getTopic";
        return $v51;
    }).call(this);
    if (shetab.common.Utility.isDefined(topicId))
        msg.setParam("topicId", topicId);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.findTopic = function (startTopicId, topicId)
 {
    var msg = (function ()
    {
        var $v52 = new shetab.ebook.common.SEMessage();
        $v52.methodName = "findTopic";
        return $v52;
    }).call(this);
    if (shetab.common.Utility.isDefined(startTopicId))
        msg.setParam("startTopicId", startTopicId);
    if (shetab.common.Utility.isDefined(topicId))
        msg.setParam("topicId", topicId);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.canExecuteCommand = function (commandName)
 {
    var msg = (function ()
    {
        var $v53 = new shetab.ebook.common.SEMessage();
        $v53.methodName = "canExecuteCommand";
        return $v53;
    }).call(this);
    if (shetab.common.Utility.isDefined(commandName))
        msg.setParam("commandName", commandName);
    msg.setParam("testValue", "true");
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.executeCommand = function (commandName)
 {
    var msg = (function ()
    {
        var $v54 = new shetab.ebook.common.SEMessage();
        $v54.methodName = "executeCommand";
        return $v54;
    }).call(this);
    if (shetab.common.Utility.isDefined(commandName))
        msg.setParam("commandName", commandName);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECore.prototype.canGetProperty = function (propertyName)
 {
    var msg = (function ()
    {
        var $v55 = new shetab.ebook.common.SEMessage();
        $v55.methodName = "canGetProperty";
        return $v55;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertyName))
        msg.setParam("propertyName", propertyName);
    msg.setParam("testValue", "true");
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.canSetProperty = function (propertyName, value)
 {
    var msg = (function ()
    {
        var $v56 = new shetab.ebook.common.SEMessage();
        $v56.methodName = "canSetProperty";
        return $v56;
    }).call(this);
    if (shetab.common.Utility.isDefined(propertyName))
        msg.setParam("propertyName", propertyName);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", value);
    msg.setParam("testValue", "true");
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECore.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.ebook.agent.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    ret.push("openShetabWebsite");
    ret.push("exit");
    ret.push("unregisterSoftLock");
    ret.push("showDocumentInfo");
    ret.push("focusToCommentText");
    ret.push("hideCommentWindow");
    ret.push("showCommentListWindow");
    ret.push("showContentsWindow");
    ret.push("showIndexWindow");
    ret.push("showFavoritesWindow");
    ret.push("showSearchWindow");
    ret.push("showHelpWindow");
    ret.push("showPageSetupWindow");
    ret.push("showFindWindow");
    ret.push("showPrintPreview");
    ret.push("showAboutWindow");
    ret.push("showAboutEngineWindow");
    ret.push("showPrintWindow");
    ret.push("toggleCommentWindowVisible");
    ret.push("toggleMarkupWindowVisible");
    ret.push("toggleFullScreen");
    ret.push("toggleFullView");
    ret.push("toggleNavigationPanelVisible");
    ret.push("toggleNavigationPanelAutoHide");
    ret.push("showPropertiesWindow");
    ret.push("showOptionsWindow");
    ret.push("zoomIn");
    ret.push("zoomOut");
    ret.push("zoomActualSize");
    ret.push("zoomFitPage");
    ret.push("zoomFitWidth");
    ret.push("zoom200");
    ret.push("zoom50");
    ret.push("addToFavorites");
    ret.push("copyAddress");

    ret.push("displayOnePage");
    ret.push("displayTwoPage");
    ret.push("exportFile");
    ret.push("refresh");
    ret.push("selectArrowTool");
    ret.push("selectHandTool");
    ret.push("selectRectangleTool");
    ret.push("selectTextBoxTool");
    ret.push("selectPencilTool");
    ret.push("selectStickyNoteTool");
    ret.push("selectCrossOutTextTool");
    ret.push("selectUnderlineTextTool");
    ret.push("selectHighlightTextTool");
    ret.push("selectHighlightTextRedTool");
    ret.push("selectHighlightTextGreenTool");
    ret.push("selectTextTipTool");
    ret.push("sendSelectionToBack");
    ret.push("bringSelectionToFront");
    ret.push("minimize");
    ret.push("maximize");
    ret.push("navigatePreviousPage");
    ret.push("navigateNextPage");
    ret.push("navigatePreviousTopic");
    ret.push("navigateNextTopic");
    ret.push("navigateBack");
    ret.push("navigateForward");
    ret.push("navigateHome");
    ret.push("navigateBlank");
    ret.push("selectAll");
    ret.push("moveSelection");
    ret.push("copySelection");
    ret.push("cutSelection");
    ret.push("deleteSelection");
    ret.push("renameSelection");
    ret.push("paste");
    ret.push("openSelection");
    ret.push("newFolder");
    ret.push("moveToPreviousSibling");
    ret.push("moveToNextSibling");
    ret.push("stopMedia");
    ret.push("playMedia");
    ret.push("pauseMedia");
    ret.push("nextMedia");
    ret.push("previousMedia");
    ret.push("togglePlayMedia");
    ret.push("toggleMute");
    ret.push("showDeveloperTools");
    ret.push("commentSubjectBox");
    ret.push("commentTextBox");
    ret.push("commentTimeBox");
    ret.push("commentAuthorBox");
    ret.push("mediaTimerBox");
    ret.push("mediaSlider");
    ret.push("volumeSlider");
    ret.push("pageNumberBox");
    ret.push("pageCountBox");
    ret.push("searchBox");
    ret.push("restart");
    ret.push("test1");
    ret.push("test2");
    ret.push("closePopupWindow");
    return ret;
};
$Inherit(shetab.ebook.agent.api.SECore, shetab.ebook.agent.api.SEApiInvoker);
shetab.ebook.agent.api.SEAgentApi = function (message)
 {
    this._message = null;
    this.set_message(message);
};
shetab.ebook.agent.api.SEAgentApi.prototype.get_message = function ()
 {
    return this._message;
};
shetab.ebook.agent.api.SEAgentApi.prototype.set_message = function (value)
 {
    this._message = value;
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "message", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_message, set: shetab.ebook.agent.api.SEAgentApi.prototype.set_message, enumerable: true});
shetab.ebook.agent.api.SEAgentApi.prototype.get_agent = function ()
 {
    return shetab.ebook.agent.SEApp.get_current().agent;
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "agent", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_agent, enumerable: true});
shetab.ebook.agent.api.SEAgentApi.prototype.get_documentCommandHandler = function ()
 {
    return shetab.ebook.agent.SEApp.get_current().get_commandHandler();
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "documentCommandHandler", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_documentCommandHandler, enumerable: true});
shetab.ebook.agent.api.SEAgentApi.prototype.get_editCommandHandler = function ()
 {
    return shetab.ebook.agent.SEApp.get_current().get_commandHandler();
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "editCommandHandler", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_editCommandHandler, enumerable: true});
shetab.ebook.agent.api.SEAgentApi.prototype.get_mediaCommandHandler = function ()
 {
    return shetab.ebook.agent.SEApp.get_current().get_commandHandler();
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "mediaCommandHandler", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_mediaCommandHandler, enumerable: true});
shetab.ebook.agent.api.SEAgentApi.prototype.get_pageCommandHandler = function ()
 {
    return shetab.ebook.agent.SEApp.get_current().get_commandHandler();
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "pageCommandHandler", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_pageCommandHandler, enumerable: true});
shetab.ebook.agent.api.SEAgentApi.prototype.get_printCommandHandler = function ()
 {
    return shetab.ebook.agent.SEApp.get_current().get_commandHandler();
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "printCommandHandler", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_printCommandHandler, enumerable: true});
shetab.ebook.agent.api.SEAgentApi.prototype.get_textCommandHandler = function ()
 {
    return shetab.ebook.agent.SEApp.get_current().get_commandHandler();
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "textCommandHandler", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_textCommandHandler, enumerable: true});
shetab.ebook.agent.api.SEAgentApi.prototype.get_zoomCommandHandler = function ()
 {
    return shetab.ebook.agent.SEApp.get_current().get_commandHandler();
};
Object.defineProperty(shetab.ebook.agent.api.SEAgentApi.prototype, "zoomCommandHandler", {get: shetab.ebook.agent.api.SEAgentApi.prototype.get_zoomCommandHandler, enumerable: true});
shetab.ebook.agent.api.SEMessageParser = function ()
 {
};
shetab.ebook.agent.api.SEMessageParser.prototype.preProcessMessage = function (message)
 {
    return null;
};
shetab.ebook.agent.api.SEMessageParser.prototype.processMessage$$String = function (message)
 {
    return this.processMessage$$SEMessage(shetab.ebook.common.SEMessage.fromXml(message));
};
shetab.ebook.agent.api.SEMessageParser.prototype.processMessage$$SEMessage = function (message)
 {
    if (message.targetInstanceId !== null && message.targetInstanceId !== shetab.ebook.agent.SEApp.get_current().get_moduleInstanceId())
        return shetab.ebook.common.SEMessage.c_unhandled;
    var res = this.preProcessMessage(message);
    if (res !== null)
        return res;
    var ret;
    switch (message.methodName)
    {
        case "getProperty":
            ret = this.processProperty(message, message.getParam("propertyName"), null);
            break;
        case "setProperty":
            ret = this.processProperty(message, message.getParam("propertyName"), message.getParam("propertyValue"));
            break;
        default :
            ret = this.processMethod(message);
            break;
    }
    return (ret !== null ? ret : shetab.ebook.common.SEMessage.c_null);
};
shetab.ebook.agent.api.SEMessageParser.prototype.processProperty = function (message, propertyName, propertyValue)
 {
    return shetab.ebook.agent.api.SEMessageParser.doProcessProperty(message, propertyName, propertyValue);
};
shetab.ebook.agent.api.SEMessageParser.prototype.processMethod = function (message)
 {
    return shetab.ebook.agent.api.SEMessageParser.doProcessMethod(message);
};
shetab.ebook.agent.api.SEMessageParser.doProcessProperty = function (message, propertyName, propertyValue)
 {
    var isGet = propertyValue === null;
    var api = new shetab.ebook.agent.api.SEAgentApi(message);
    if (message.typeName === "Agent")
    {
    }
    if (message.typeName === "DocumentCommandHandler")
    {
        if (propertyName === "currentBookmark")
        {
            if (isGet)
            {
                var res = api.documentCommandHandler.currentBookmark;
                return res;
            }
            throw new Error("currentBookmark property is read-only!");
        }
        if (propertyName === "isOpen")
        {
            if (isGet)
            {
                var res = api.documentCommandHandler.isOpen;
                return (res === null) ? null : res.toString();
            }

            throw new Error("isOpen property is read-only!");
        }
    }
    if (message.typeName === "EditCommandHandler")
    {
        if (propertyName === "canCopy")
        {
            if (isGet)
            {
                var res = api.editCommandHandler.canCopy;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canCopy property is read-only!");
        }
        if (propertyName === "canCut")
        {
            if (isGet)
            {
                var res = api.editCommandHandler.canCut;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canCut property is read-only!");
        }
        if (propertyName === "canPaste")
        {
            if (isGet)
            {
                var res = api.editCommandHandler.canPaste;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canPaste property is read-only!");
        }
        if (propertyName === "canDel")
        {
            if (isGet)
            {
                var res = api.editCommandHandler.canDel;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canDel property is read-only!");
        }
        if (propertyName === "canSelectAll")
        {
            if (isGet)
            {
                var res = api.editCommandHandler.canSelectAll;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canSelectAll property is read-only!");
        }
    }
    if (message.typeName === "MediaCommandHandler")
    {
        if (propertyName === "mediaState")
        {
            if (isGet)
            {
                var res = api.mediaCommandHandler.mediaState;
                return res;
            }
            api.mediaCommandHandler.mediaState = propertyValue;
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (propertyName === "canNextMedia")
        {
            if (isGet)
            {
                var res = api.mediaCommandHandler.canNextMedia;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canNextMedia property is read-only!");
        }
        if (propertyName === "canPreviousMedia")
        {
            if (isGet)
            {
                var res = api.mediaCommandHandler.canPreviousMedia;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canPreviousMedia property is read-only!");
        }
        if (propertyName === "mediaPosition")
        {
            if (isGet)
            {
                var res = api.mediaCommandHandler.mediaPosition;
                return (res === null) ? null : res.toString();
            }
            api.mediaCommandHandler.mediaPosition = shetab.common.Convert.toNumber(propertyValue);
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (propertyName === "mediaLength")
        {
            if (isGet)
            {
                var res = api.mediaCommandHandler.mediaLength;
                return (res === null) ? null : res.toString();
            }
            throw new Error("mediaLength property is read-only!");
        }
        if (propertyName === "loopMedia")
        {
            if (isGet)
            {
                var res = api.mediaCommandHandler.loopMedia;
                return (res === null) ? null : res.toString();
            }
            api.mediaCommandHandler.loopMedia = shetab.common.Convert.toNumber(propertyValue);
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "PageCommandHandler")
    {
        if (propertyName === "pageNumber")
        {
            if (isGet)
            {
                var res = api.pageCommandHandler.pageNumber;
                return (res === null) ? null : res.toString();
            }
            api.pageCommandHandler.pageNumber = shetab.common.Convert.toNumber(propertyValue);
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (propertyName === "pageCount")
        {
            if (isGet)
            {
                var res = api.pageCommandHandler.pageCount;
                return (res === null) ? null : res.toString();
            }
            throw new Error("pageCount property is read-only!");
        }
        if (propertyName === "pageViewCount")
        {
            if (isGet)
            {
                var res = api.pageCommandHandler.pageViewCount;
                return (res === null) ? null : res.toString();
            }
            api.pageCommandHandler.pageViewCount = shetab.common.Convert.toNumber(propertyValue);
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "PrintCommandHandler")
    {
        if (propertyName === "canPrint")
        {
            if (isGet)
            {
                var res = api.printCommandHandler.canPrint;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canPrint property is read-only!");
        }
        if (propertyName === "canPrintPreview")
        {
            if (isGet)
            {
                var res = api.printCommandHandler.canPrintPreview;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canPrintPreview property is read-only!");
        }
        if (propertyName === "canPrintSetup")
        {
            if (isGet)
            {
                var res = api.printCommandHandler.canPrintSetup;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canPrintSetup property is read-only!");
        }
    }
    if (message.typeName === "TextCommandHandler")
    {
        if (propertyName === "selectedText")
        {
            if (isGet)
            {
                var res = api.textCommandHandler.selectedText;
                return (res === null) ? null : res.toString();
            }
            throw new Error("selectedText property is read-only!");
        }
        if (propertyName === "canHighlightTexts")
        {
            if (isGet)
            {
                var res = api.textCommandHandler.canHighlightTexts;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canHighlightTexts property is read-only!");
        }
    }
    if (message.typeName === "ZoomCommandHandler")
    {
        if (propertyName === "canZoomIn")
        {
            if (isGet)
            {
                var res = api.zoomCommandHandler.canZoomIn;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canZoomIn property is read-only!");
        }
        if (propertyName === "canZoomOut")
        {
            if (isGet)
            {
                var res = api.zoomCommandHandler.canZoomOut;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canZoomOut property is read-only!");
        }
        if (propertyName === "zoom")
        {
            if (isGet)
            {
                var res = api.zoomCommandHandler.zoom;
                return (res === null) ? null : res.toString();
            }
            api.zoomCommandHandler.zoom = shetab.common.Convert.toNumber(propertyValue);
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (propertyName === "zoomMode")
        {
            if (isGet)
            {

                var res = api.zoomCommandHandler.zoomMode;
                return res;
            }
            api.zoomCommandHandler.zoomMode = propertyValue;
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    return shetab.ebook.common.SEMessage.c_unhandled;
};
shetab.ebook.agent.api.SEMessageParser.doProcessMethod = function (message)
 {
    var api = new shetab.ebook.agent.api.SEAgentApi(message);
    if (message.typeName === "Agent")
    {
        if (message.methodName === "isModuleInstanceExists")
        {
            var res = api.agent.isModuleInstanceExists(message.getParam("moduleInstanceId"));
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "fireUpdateUI")
        {
            api.agent.fireUpdateUI();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "firePropertyBagChanged")
        {
            api.agent.firePropertyBagChanged(shetab.ebook.common.SEMessage.array_fromString(message.getParam("moduleEntities"),  String), message.getParam("changeSetId"));
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "firePropertiesChanged")
        {
            api.agent.firePropertiesChanged(shetab.ebook.common.SEMessage.array_fromString(message.getParam("properties"),  String));
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "fireRefreshTopics")
        {
            api.agent.fireRefreshTopics();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "fireCustomNotify")
        {
            api.agent.fireCustomNotify(message.getParam("notifyName"), message.getParam("notifyValue"));
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "initializeModulePlaceholder")
        {
            api.agent.initializeModulePlaceholder(message.getParam("placeholderId"), message.getParam("url"));
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "invokeStorageCallback")
        {
            api.agent.invokeStorageCallback(message.getParam("callbackId"), shetab.common.Convert.toBoolean(message.getParam("success")), message.getParam("statusText"), message.getParam("responseText"), message.getParamByteArray("responseByteArray"), message.getParam("type"));
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "DocumentCommandHandler")
    {
        if (message.methodName === "open")
        {
            api.documentCommandHandler.open(message.getParam("url"), shetab.common.Convert.toNumber(message.getParam("pageNumber")), message.getParam("bookmark"));
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "goToBookmark")
        {
            api.documentCommandHandler.goToBookmark(message.getParam("bookmark"));
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "EditCommandHandler")
    {
        if (message.methodName === "copy")
        {
            api.editCommandHandler.copy();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "cut")
        {
            api.editCommandHandler.cut();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "paste")
        {
            api.editCommandHandler.paste();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "del")
        {
            api.editCommandHandler.del();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "selectAll")
        {
            api.editCommandHandler.selectAll();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "clearSelection")
        {
            api.editCommandHandler.clearSelection();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "MediaCommandHandler")
    {
        if (message.methodName === "canSetMediaState")
        {
            var res = api.mediaCommandHandler.canSetMediaState(message.getParam("state"));
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "nextMedia")
        {
            api.mediaCommandHandler.nextMedia();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "previousMedia")
        {
            api.mediaCommandHandler.previousMedia();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "PageCommandHandler")
    {
        if (message.methodName === "canSetPageViewCount")
        {
            var res = api.pageCommandHandler.canSetPageViewCount(shetab.common.Convert.toNumber(message.getParam("value")));
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "getPageLabelFromPageNumber")
        {
            var res = api.pageCommandHandler.getPageLabelFromPageNumber(shetab.common.Convert.toNumber(message.getParam("value")));
            return res;
        }
        if (message.methodName === "getPageNumberFromPageLabel")
        {
            var res = api.pageCommandHandler.getPageNumberFromPageLabel(message.getParam("value"));
            return (res === null) ? null : res.toString();
        }
    }
    if (message.typeName === "PrintCommandHandler")
    {
        if (message.methodName === "print")
        {
            var res = api.printCommandHandler.print();
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "printPreview")
        {
            var res = api.printCommandHandler.printPreview();
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "printSetup")
        {
            var res = api.printCommandHandler.printSetup();
            return (res === null) ? null : res.toString();
        }
    }
    if (message.typeName === "TextCommandHandler")
    {
        if (message.methodName === "highlightTexts")
        {
            api.textCommandHandler.highlightTexts(message.getParam("value"));
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "ZoomCommandHandler")
    {
        if (message.methodName === "canSetZoomMode")
        {
            var res = api.zoomCommandHandler.canSetZoomMode(message.getParam("value"));
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "canSetZoom")
        {
            var res = api.zoomCommandHandler.canSetZoom(shetab.common.Convert.toNumber(message.getParam("value")));
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "zoomIn")
        {
            api.zoomCommandHandler.zoomIn();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
        if (message.methodName === "zoomOut")
        {
            api.zoomCommandHandler.zoomOut();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    return shetab.ebook.common.SEMessage.c_unhandled;
};
shetab.ebook.agent.SEPropertyBagItemProperty = function ()
 {
    this._itemId = null;
    this._moduleEntityId = null;
    this._propertySetId = null;
    this._propertyName = null;
};

shetab.ebook.agent.SEPropertyBagItemProperty.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("itemId");
    info.addString("propertySetId");
    info.addString("moduleEntityId");
    info.addString("propertyName");
};
shetab.ebook.agent.SEPropertyBagItemProperty.prototype.get_itemId = function ()
 {
    return this._itemId;
};
shetab.ebook.agent.SEPropertyBagItemProperty.prototype.set_itemId = function (value)
 {
    this._itemId = value;
};
Object.defineProperty(shetab.ebook.agent.SEPropertyBagItemProperty.prototype, "itemId", {get: shetab.ebook.agent.SEPropertyBagItemProperty.prototype.get_itemId, set: shetab.ebook.agent.SEPropertyBagItemProperty.prototype.set_itemId, enumerable: true});
shetab.ebook.agent.SEPropertyBagItemProperty.prototype.get_moduleEntityId = function ()
 {
    return this._moduleEntityId;
};
shetab.ebook.agent.SEPropertyBagItemProperty.prototype.set_moduleEntityId = function (value)
 {
    this._moduleEntityId = value;
};
Object.defineProperty(shetab.ebook.agent.SEPropertyBagItemProperty.prototype, "moduleEntityId", {get: shetab.ebook.agent.SEPropertyBagItemProperty.prototype.get_moduleEntityId, set: shetab.ebook.agent.SEPropertyBagItemProperty.prototype.set_moduleEntityId, enumerable: true});
shetab.ebook.agent.SEPropertyBagItemProperty.prototype.get_propertySetId = function ()
 {
    return this._propertySetId;
};
shetab.ebook.agent.SEPropertyBagItemProperty.prototype.set_propertySetId = function (value)
 {
    this._propertySetId = value;
};
Object.defineProperty(shetab.ebook.agent.SEPropertyBagItemProperty.prototype, "propertySetId", {get: shetab.ebook.agent.SEPropertyBagItemProperty.prototype.get_propertySetId, set: shetab.ebook.agent.SEPropertyBagItemProperty.prototype.set_propertySetId, enumerable: true});
shetab.ebook.agent.SEPropertyBagItemProperty.prototype.get_propertyName = function ()
 {
    return this._propertyName;
};
shetab.ebook.agent.SEPropertyBagItemProperty.prototype.set_propertyName = function (value)
 {
    this._propertyName = value;
};
Object.defineProperty(shetab.ebook.agent.SEPropertyBagItemProperty.prototype, "propertyName", {get: shetab.ebook.agent.SEPropertyBagItemProperty.prototype.get_propertyName, set: shetab.ebook.agent.SEPropertyBagItemProperty.prototype.set_propertyName, enumerable: true});
shetab.ebook.agent.SEPropertyBagChangedEventHandlerArgs = function (moduleEntityId, changeSetId)
 {
    this._moduleEntityId = null;
    this._changeSetId = null;
    this._items = null;
    this._moduleEntityId = moduleEntityId;
    this._changeSetId = changeSetId;
};
shetab.ebook.agent.SEPropertyBagChangedEventHandlerArgs.prototype.get_items = function ()
 {
    return (this._items !== null ? this._items : (this._items = shetab.ebook.agent.SEApp.get_current().internalCore.getPropertyBagChangeSet(this._moduleEntityId, this._changeSetId)));
};
Object.defineProperty(shetab.ebook.agent.SEPropertyBagChangedEventHandlerArgs.prototype, "items", {get: shetab.ebook.agent.SEPropertyBagChangedEventHandlerArgs.prototype.get_items, enumerable: true});
shetab.ebook.agent.SESelectedItem = function ()
 {
    this._itemId = null;
    this._propertySetId = null;
    this._moduleEntityId = null;
};
shetab.ebook.agent.SESelectedItem.prototype.get_itemId = function ()
 {
    return this._itemId;
};
shetab.ebook.agent.SESelectedItem.prototype.set_itemId = function (value)
 {
    this._itemId = value;
};
Object.defineProperty(shetab.ebook.agent.SESelectedItem.prototype, "itemId", {get: shetab.ebook.agent.SESelectedItem.prototype.get_itemId, set: shetab.ebook.agent.SESelectedItem.prototype.set_itemId, enumerable: true});
shetab.ebook.agent.SESelectedItem.prototype.get_propertySetId = function ()
 {
    return this._propertySetId;
};
shetab.ebook.agent.SESelectedItem.prototype.set_propertySetId = function (value)
 {
    this._propertySetId = value;
};
Object.defineProperty(shetab.ebook.agent.SESelectedItem.prototype, "propertySetId", {get: shetab.ebook.agent.SESelectedItem.prototype.get_propertySetId, set: shetab.ebook.agent.SESelectedItem.prototype.set_propertySetId, enumerable: true});
shetab.ebook.agent.SESelectedItem.prototype.get_moduleEntityId = function ()
 {
    return this._moduleEntityId;
};
shetab.ebook.agent.SESelectedItem.prototype.set_moduleEntityId = function (value)
 {
    this._moduleEntityId = value;
};
Object.defineProperty(shetab.ebook.agent.SESelectedItem.prototype, "moduleEntityId", {get: shetab.ebook.agent.SESelectedItem.prototype.get_moduleEntityId, set: shetab.ebook.agent.SESelectedItem.prototype.set_moduleEntityId, enumerable: true});
shetab.ebook.agent.SESelectedItem.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("itemId");
    info.addString("propertySetId");
    info.addString("moduleEntityId");
};
shetab.ebook.agent.StorageCallbackParam = function (success, statusText, response, type)
 {
    this.success = null;
    this.statusText = null;
    this.response = null;
    this.type = null;
    this.success = success;
    this.statusText = statusText;
    this.response = shetab.common.Utility.checkUndefined(response, null);
    this.type = shetab.common.Utility.checkUndefined(type, null);
};
if (typeof(shetab.ebook.agent.controls) == "undefined")
    shetab.ebook.agent.controls = {};
shetab.ebook.agent.controls.SEButton = function (element, command)
 {
    this._command = null;
    this._element = null;
    this._labelElement = null;
    this._isPress = null;
    this._isHover = null;
    this._isEnabledBinding = null;
    this._isCheckedBinding = null;
    this._command = command;
    this._element = element;
    this._labelElement = shetab.common.Html.findLabelOfControl(element);
    if (command !== null)
    {
        this.set_isEnabled(command.get_canExecute());
        command.add_canExecuteChanged($CreateDelegate(this, this.command_canExecuteChanged));
    }
    this.get_element().addEventListener("click", $CreateDelegate(this, this.element_click), false);
    this.get_element().addEventListener("mouseout", $CreateDelegate(this, this.element_onmouseout), false);
    this.get_element().addEventListener("mouseover", $CreateDelegate(this, this.element_onmouseover), false);
    this.get_element().addEventListener("mousedown", $CreateDelegate(this, this.element_onmousedown), false);
    if (this._labelElement !== null)
    {
        this._labelElement.addEventListener("mouseout", $CreateDelegate(this, this.element_onmouseout), false);
        this._labelElement.addEventListener("mouseover", $CreateDelegate(this, this.element_onmouseover), false);
        this._labelElement.addEventListener("mousedown", $CreateDelegate(this, this.element_onmousedown), false);
    }
    this.refresh();
};
shetab.ebook.agent.controls.SEButton.prototype.get_command = function ()
 {
    return this._command;
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "command", {get: shetab.ebook.agent.controls.SEButton.prototype.get_command, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_element = function ()
 {
    return this._element;
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "element", {get: shetab.ebook.agent.controls.SEButton.prototype.get_element, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_labelElement = function ()
 {
    return this._labelElement;
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "labelElement", {get: shetab.ebook.agent.controls.SEButton.prototype.get_labelElement, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.element_onmousedown = function (evt)
 {
    this._isPress = true;
    this.refresh();
    document.addEventListener("mouseup", $CreateDelegate(this, this.element_onmouseup), false);
};

shetab.ebook.agent.controls.SEButton.prototype.element_onmouseup = function (evt)
 {
    this._isPress = false;
    this.refresh();
    document.removeEventListener("mouseup", $CreateDelegate(this, this.element_onmouseup), false);
};
shetab.ebook.agent.controls.SEButton.prototype.element_onmouseout = function (evt)
 {
    this._isHover = false;
    this.refresh();
};
shetab.ebook.agent.controls.SEButton.prototype.element_onmouseover = function (evt)
 {
    this._isHover = true;
    this.refresh();
};
shetab.ebook.agent.controls.SEButton.prototype.command_canExecuteChanged = function ()
 {
    this.set_isEnabled(this.get_command().get_canExecute());
};
shetab.ebook.agent.controls.SEButton.prototype.element_click = function (e)
 {
    if (this.get_isEnabled())
    {
        if (this.get_command() !== null)
            this.get_command().execute();
        else if (this.get_isCheckedBinding() !== null)
        {
            if (!this.get_isCheckBox())
                this.set_isChecked(!this.get_isChecked());
            this.get_isCheckedBinding().updateSource();
        }
    }
    this.refresh();
};
shetab.ebook.agent.controls.SEButton.prototype.get_isPress = function ()
 {
    return this._isPress && this.get_isEnabled();
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isPress", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isPress, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_isHover = function ()
 {
    return this._isHover && this.get_isEnabled();
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isHover", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isHover, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_isCheckBox = function ()
 {
    return this.get_element().type === "checkbox";
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isCheckBox", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isCheckBox, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_isjQueryButton = function ()
 {
    return shetab.common.Utility.isDefinedLiteral("jQuery") && this.get_element().classList.contains("ui-button");
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isjQueryButton", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isjQueryButton, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_isjQueryCheckBox = function ()
 {
    return this.get_isCheckBox() && shetab.common.Utility.isDefinedLiteral("jQuery") && this.get_element().classList.contains("ui-helper-hidden-accessible");
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isjQueryCheckBox", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isjQueryCheckBox, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.modifyClass = function (className, isAdd)
 {
    if (isAdd)
    {
        this.get_element().classList.add(className);
        if (this.get_labelElement() !== null)
            this.get_labelElement().classList.add(className);
    }
    else
    {
        this.get_element().classList.remove(className);
        if (this.get_labelElement() !== null)
            this.get_labelElement().classList.add(className);
    }
};
shetab.ebook.agent.controls.SEButton.prototype.get_isEnabled = function ()
 {
    return !this.get_element().disabled;
};
shetab.ebook.agent.controls.SEButton.prototype.set_isEnabled = function (value)
 {
    if (value === this.get_isEnabled())
        return;
    this.get_element().disabled = !value;
    this.refresh();
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isEnabled", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isEnabled, set: shetab.ebook.agent.controls.SEButton.prototype.set_isEnabled, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_isEnabledBinding = function ()
 {
    return this._isEnabledBinding;
};
shetab.ebook.agent.controls.SEButton.prototype.set_isEnabledBinding = function (value)
 {
    this._isEnabledBinding = value;
    this._isEnabledBinding.setBinding(this, "isEnabled");
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isEnabledBinding", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isEnabledBinding, set: shetab.ebook.agent.controls.SEButton.prototype.set_isEnabledBinding, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_isChecked = function ()
 {
    return this.get_element().checked;
};
shetab.ebook.agent.controls.SEButton.prototype.set_isChecked = function (value)
 {
    if (value === this.get_isChecked())
        return;
    this.get_element().checked = value;
    this.refresh();
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isChecked", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isChecked, set: shetab.ebook.agent.controls.SEButton.prototype.set_isChecked, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.get_isCheckedBinding = function ()
 {
    return this._isCheckedBinding;
};
shetab.ebook.agent.controls.SEButton.prototype.set_isCheckedBinding = function (value)
 {
    this._isCheckedBinding = value;
    this._isCheckedBinding.setBinding(this, "isChecked");
};
Object.defineProperty(shetab.ebook.agent.controls.SEButton.prototype, "isCheckedBinding", {get: shetab.ebook.agent.controls.SEButton.prototype.get_isCheckedBinding, set: shetab.ebook.agent.controls.SEButton.prototype.set_isCheckedBinding, enumerable: true});
shetab.ebook.agent.controls.SEButton.prototype.refresh = function ()
 {
    this.modifyClass("se-disabled", !this.get_isEnabled());
    this.modifyClass("se-hover", this.get_isHover() && this.get_isEnabled());
    this.modifyClass("se-press", this.get_isPress());
    this.modifyClass("se-checked", this.get_isChecked());
    if (this.get_isjQueryButton())
    {
          jQuery(this.element).button(this.isEnabled ? 'enable' : 'disable') ;
    }
    if (this.get_isjQueryCheckBox() || this.get_isjQueryButton())
    {
         jQuery(this.element).button('refresh');
    }
};
shetab.ebook.agent.controls.SESlider = function (element)
 {
    this._element = null;
    this._valueBinding = null;
    this._maximumBinding = null;
    this._minimumBinding = null;
    this._isEnabledBinding = null;
    this._isDragMode = false;
    this._isPress = null;
    this._isHover = null;
    this._element = element;
    this._element.addEventListener("mouseout", $CreateDelegate(this, this.element_onmouseout), false);
    this._element.addEventListener("mouseover", $CreateDelegate(this, this.element_onmouseover), false);
    this._element.addEventListener("mousedown", $CreateDelegate(this, this.element_onmousedown), false);
    this._element.addEventListener("mouseup", $CreateDelegate(this, this.element_onmouseup), false);
    var onChangeListener = $CreateDelegate(this, this.element_onchange);
    if (this.get_isjQuerySlider())
         jQuery(this._element).bind('slide', onChangeListener);
    else
        this.get_element().addEventListener("change", onChangeListener, false);
};
shetab.ebook.agent.controls.SESlider.prototype.get_element = function ()
 {
    return this._element;
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "element", {get: shetab.ebook.agent.controls.SESlider.prototype.get_element, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.element_onchange = function (evt, ui)
 {
    if (this.get_isjQuerySlider())
        this.set_value(ui["value"]);
    if (this.get_valueBinding() !== null && this.get_valueBinding().get_canUpdateSource())
        this.get_valueBinding().updateSource();
};
shetab.ebook.agent.controls.SESlider.prototype.get_valueBinding = function ()
 {

    return this._valueBinding;
};
shetab.ebook.agent.controls.SESlider.prototype.set_valueBinding = function (value)
 {
    this._valueBinding = value;
    this._valueBinding.setBinding(this, "value");
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "valueBinding", {get: shetab.ebook.agent.controls.SESlider.prototype.get_valueBinding, set: shetab.ebook.agent.controls.SESlider.prototype.set_valueBinding, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_maximumBinding = function ()
 {
    return this._maximumBinding;
};
shetab.ebook.agent.controls.SESlider.prototype.set_maximumBinding = function (value)
 {
    this._maximumBinding = value;
    this._maximumBinding.setBinding(this, "maximum");
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "maximumBinding", {get: shetab.ebook.agent.controls.SESlider.prototype.get_maximumBinding, set: shetab.ebook.agent.controls.SESlider.prototype.set_maximumBinding, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_minimumBinding = function ()
 {
    return this._minimumBinding;
};
shetab.ebook.agent.controls.SESlider.prototype.set_minimumBinding = function (value)
 {
    this._minimumBinding = value;
    this._minimumBinding.setBinding(this, "minimum");
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "minimumBinding", {get: shetab.ebook.agent.controls.SESlider.prototype.get_minimumBinding, set: shetab.ebook.agent.controls.SESlider.prototype.set_minimumBinding, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_isEnabledBinding = function ()
 {
    return this._isEnabledBinding;
};
shetab.ebook.agent.controls.SESlider.prototype.set_isEnabledBinding = function (value)
 {
    this._isEnabledBinding = value;
    this._isEnabledBinding.setBinding(this, "isEnabled");
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "isEnabledBinding", {get: shetab.ebook.agent.controls.SESlider.prototype.get_isEnabledBinding, set: shetab.ebook.agent.controls.SESlider.prototype.set_isEnabledBinding, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_value = function ()
 {
    return this.get_isjQuerySlider() ? shetab.common.Convert.toNumber( jQuery(this._element).slider('option', 'value')) : shetab.common.Convert.toNumber(this.get_element().value);
};
shetab.ebook.agent.controls.SESlider.prototype.set_value = function (value)
 {
    if (value === this.get_value())
        return;
    if (this.get_isjQuerySlider())
         jQuery(this._element).slider('option', 'value', value);
    else
        this.get_element().value = value.toString();
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "value", {get: shetab.ebook.agent.controls.SESlider.prototype.get_value, set: shetab.ebook.agent.controls.SESlider.prototype.set_value, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_step = function ()
 {
    return this.get_isjQuerySlider() ? shetab.common.Convert.toNumber( jQuery(this._element).slider('option', 'step')) : shetab.common.Convert.toNumber(this.get_element().step);
};
shetab.ebook.agent.controls.SESlider.prototype.set_step = function (value)
 {
    if (this.get_isjQuerySlider())
          jQuery(this._element).slider('option', 'step', value);
    else
        this.get_element().step = value.toString();
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "step", {get: shetab.ebook.agent.controls.SESlider.prototype.get_step, set: shetab.ebook.agent.controls.SESlider.prototype.set_step, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_isDragMode = function ()
 {
    return this._isDragMode;
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "isDragMode", {get: shetab.ebook.agent.controls.SESlider.prototype.get_isDragMode, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.element_onmouseup = function (evt)
 {
    this._isPress = false;
    this._isDragMode = false;
    this.refresh();
};
shetab.ebook.agent.controls.SESlider.prototype.element_onmousedown = function (evt)
 {
    this._isPress = true;
    this._isDragMode = true;
    this.refresh();
};
shetab.ebook.agent.controls.SESlider.prototype.element_onmouseover = function (evt)
 {
    this._isHover = true;
    this.refresh();
};
shetab.ebook.agent.controls.SESlider.prototype.element_onmouseout = function (evt)
 {
    this._isHover = false;
    this.refresh();
};
shetab.ebook.agent.controls.SESlider.prototype.refresh = function ()
 {
    this.modifyClass("se-disabled", !this.get_isEnabled());
    this.modifyClass("se-hover", this.get_isHover());
    this.modifyClass("se-press", this.get_isPress());
};
shetab.ebook.agent.controls.SESlider.prototype.modifyClass = function (className, isAdd)
 {
    if (isAdd)
    {
        this.get_element().classList.add(className);
    }
    else
    {
        this.get_element().classList.remove(className);
    }
};
shetab.ebook.agent.controls.SESlider.prototype.get_isPress = function ()
 {
    return this._isPress && this.get_isEnabled();
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "isPress", {get: shetab.ebook.agent.controls.SESlider.prototype.get_isPress, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_isHover = function ()
 {
    return this._isHover && this.get_isEnabled();
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "isHover", {get: shetab.ebook.agent.controls.SESlider.prototype.get_isHover, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_isEnabled = function ()
 {
    if (this.get_isjQuerySlider())
    {
        return  !jQuery(this._element).slider('option', 'disabled');
    }
    return !this.get_element().disabled;
};
shetab.ebook.agent.controls.SESlider.prototype.set_isEnabled = function (value)
 {
    if (value === this.get_isEnabled())
        return;
    if (this.get_isjQuerySlider())
    {
         jQuery(this._element).slider('option', 'disabled', !value);
    }
    else
        this.get_element().disabled = !value;
    this.refresh();
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "isEnabled", {get: shetab.ebook.agent.controls.SESlider.prototype.get_isEnabled, set: shetab.ebook.agent.controls.SESlider.prototype.set_isEnabled, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_minimum = function ()
 {
    return this.get_isjQuerySlider() ? shetab.common.Convert.toNumber( jQuery(this._element).slider('option', 'min')) : shetab.common.Convert.toNumber(this.get_element().min);
};
shetab.ebook.agent.controls.SESlider.prototype.set_minimum = function (value)
 {
    if (this.get_isjQuerySlider())
         jQuery(this._element).slider('option', 'min', value);
    else
        this.get_element().min = value.toString();
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "minimum", {get: shetab.ebook.agent.controls.SESlider.prototype.get_minimum, set: shetab.ebook.agent.controls.SESlider.prototype.set_minimum, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_maximum = function ()
 {
    return this.get_isjQuerySlider() ? shetab.common.Convert.toNumber( jQuery(this._element).slider('option', 'max')) : shetab.common.Convert.toNumber(this.get_element().max);
};
shetab.ebook.agent.controls.SESlider.prototype.set_maximum = function (value)
 {
    if (this.get_isjQuerySlider())
         jQuery(this._element).slider('option', 'max', value);
    else
        this.get_element().max = value.toString();
};

Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "maximum", {get: shetab.ebook.agent.controls.SESlider.prototype.get_maximum, set: shetab.ebook.agent.controls.SESlider.prototype.set_maximum, enumerable: true});
shetab.ebook.agent.controls.SESlider.prototype.get_isjQuerySlider = function ()
 {
    return shetab.ebook.agent.controls.SESlider.isJQuerySliderElement(this.get_element());
};
Object.defineProperty(shetab.ebook.agent.controls.SESlider.prototype, "isjQuerySlider", {get: shetab.ebook.agent.controls.SESlider.prototype.get_isjQuerySlider, enumerable: true});
shetab.ebook.agent.controls.SESlider.isSliderElement = function (element)
 {
    return (element.tagName === "INPUT" && element.type.toLowerCase() === "range") || shetab.ebook.agent.controls.SESlider.isJQuerySliderElement(element);
};
shetab.ebook.agent.controls.SESlider.isJQuerySliderElement = function (element)
 {
    return shetab.common.Utility.isDefinedLiteral("jQuery") && element.classList.contains("ui-slider");
};
shetab.ebook.agent.controls.SEText = function (element)
 {
    this._element = null;
    this._isHover = null;
    this._emptyText = null;
    this._textBinding = null;
    this._isEnabledBinding = null;
    this._element = element;
    this._element.addEventListener("mouseout", $CreateDelegate(this, this.element_onmouseout), false);
    this._element.addEventListener("mouseover", $CreateDelegate(this, this.element_onmouseover), false);
    this._element.addEventListener("focus", $CreateDelegate(this, this.element_onfocus), false);
    this._element.addEventListener("blur", $CreateDelegate(this, this.element_onblur), false);
    this._element.addEventListener("keypress", $CreateDelegate(this, this.element_onkeypress), false);
};
shetab.ebook.agent.controls.SEText.prototype.get_element = function ()
 {
    return this._element;
};
Object.defineProperty(shetab.ebook.agent.controls.SEText.prototype, "element", {get: shetab.ebook.agent.controls.SEText.prototype.get_element, enumerable: true});
shetab.ebook.agent.controls.SEText.prototype.element_onkeypress = function (evt)
 {
    if (evt["witch"] !== 13)
        return;
    if (this.get_textBinding() !== null && this.get_textBinding().get_canUpdateSource())
        this.get_textBinding().updateSource();
};
shetab.ebook.agent.controls.SEText.prototype.element_onblur = function (evt)
 {
    if (this.get_emptyText() !== null && this.get_text() === "")
    {
        this.set_text(this.get_emptyText());
        return;
    }
    if (this.get_textBinding() !== null && this.get_textBinding().get_canUpdateSource())
        this.get_textBinding().updateSource();
};
shetab.ebook.agent.controls.SEText.prototype.element_onfocus = function (evt)
 {
    var ele = this.get_element();
    setTimeout($CreateDelegate(ele, ele.select), 0);
};
shetab.ebook.agent.controls.SEText.prototype.element_onmouseover = function (evt)
 {
    this._isHover = true;
    this.refresh();
};
shetab.ebook.agent.controls.SEText.prototype.element_onmouseout = function (evt)
 {
    this._isHover = false;
    this.refresh();
};
shetab.ebook.agent.controls.SEText.prototype.get_readonly = function ()
 {
    return this.get_element().hasAttribute("readonly");
};
shetab.ebook.agent.controls.SEText.prototype.set_readonly = function (value)
 {
    if (value)
        this.get_element().setAttribute("readonly", "readonly");
    else
        this.get_element().removeAttribute("readonly");
};
Object.defineProperty(shetab.ebook.agent.controls.SEText.prototype, "readonly", {get: shetab.ebook.agent.controls.SEText.prototype.get_readonly, set: shetab.ebook.agent.controls.SEText.prototype.set_readonly, enumerable: true});
shetab.ebook.agent.controls.SEText.prototype.get_isHover = function ()
 {
    return this._isHover && this.get_isEnabled();
};
Object.defineProperty(shetab.ebook.agent.controls.SEText.prototype, "isHover", {get: shetab.ebook.agent.controls.SEText.prototype.get_isHover, enumerable: true});
shetab.ebook.agent.controls.SEText.prototype.refresh = function ()
 {
    this.modifyClass("se-disabled", !this.get_isEnabled());
    this.modifyClass("se-hover", this.get_isHover());
};
shetab.ebook.agent.controls.SEText.prototype.modifyClass = function (className, isAdd)
 {
    if (isAdd)
    {
        this.get_element().classList.add(className);
    }
    else
    {
        this.get_element().classList.remove(className);
    }
};
shetab.ebook.agent.controls.SEText.prototype.get_text = function ()
 {
    return this.get_element().value;
};
shetab.ebook.agent.controls.SEText.prototype.set_text = function (value)
 {
    this.get_element().value = value;
};
Object.defineProperty(shetab.ebook.agent.controls.SEText.prototype, "text", {get: shetab.ebook.agent.controls.SEText.prototype.get_text, set: shetab.ebook.agent.controls.SEText.prototype.set_text, enumerable: true});
shetab.ebook.agent.controls.SEText.prototype.get_emptyText = function ()
 {
    return this._emptyText;
};
shetab.ebook.agent.controls.SEText.prototype.set_emptyText = function (value)
 {
    this._emptyText = value;
    if (value !== null && this.get_text() === "")
        this.set_text(value);
};
Object.defineProperty(shetab.ebook.agent.controls.SEText.prototype, "emptyText", {get: shetab.ebook.agent.controls.SEText.prototype.get_emptyText, set: shetab.ebook.agent.controls.SEText.prototype.set_emptyText, enumerable: true});
shetab.ebook.agent.controls.SEText.prototype.get_isEnabled = function ()
 {
    return !this.get_element().disabled;
};
shetab.ebook.agent.controls.SEText.prototype.set_isEnabled = function (value)
 {
    if (this.get_isEnabled() === value)
        return;
    this.get_element().disabled = !value;
    this.refresh();
};
Object.defineProperty(shetab.ebook.agent.controls.SEText.prototype, "isEnabled", {get: shetab.ebook.agent.controls.SEText.prototype.get_isEnabled, set: shetab.ebook.agent.controls.SEText.prototype.set_isEnabled, enumerable: true});
shetab.ebook.agent.controls.SEText.prototype.get_textBinding = function ()
 {
    return this._textBinding;
};
shetab.ebook.agent.controls.SEText.prototype.set_textBinding = function (value)
 {
    this._textBinding = value;
    this._textBinding.setBinding(this, "text");
};
Object.defineProperty(shetab.ebook.agent.controls.SEText.prototype, "textBinding", {get: shetab.ebook.agent.controls.SEText.prototype.get_textBinding, set: shetab.ebook.agent.controls.SEText.prototype.set_textBinding, enumerable: true});
shetab.ebook.agent.controls.SEText.prototype.get_isEnabledBinding = function ()
 {
    return this._isEnabledBinding;
};
shetab.ebook.agent.controls.SEText.prototype.set_isEnabledBinding = function (value)
 {
    this._isEnabledBinding = value;
    this._isEnabledBinding.setBinding(this, "isEnabled");
};
Object.defineProperty(shetab.ebook.agent.controls.SEText.prototype, "isEnabledBinding", {get: shetab.ebook.agent.controls.SEText.prototype.get_isEnabledBinding, set: shetab.ebook.agent.controls.SEText.prototype.set_isEnabledBinding, enumerable: true});
shetab.ebook.agent.controls.SEText.isTextElement = function (element)
 {
    return (element.tagName === "INPUT" && element.type.toLowerCase() === "text");
};
if (typeof(shetab.ebook.agent.converters) == "undefined")
    shetab.ebook.agent.converters = {};
shetab.ebook.agent.converters.SEEnabledConverter = function (propertyName, checkedValue, uncheckedValue)
 {
    this._propertyName = null;
    this._checkedValue = null;
    this._uncheckedValue = null;
    this._propertyName = propertyName;
    this._checkedValue = checkedValue;
    this._uncheckedValue = uncheckedValue;
};
shetab.ebook.agent.converters.SEEnabledConverter.prototype.convert = function (value, targetCtor, parameter)
 {
    if (value === this._checkedValue)
        return shetab.ebook.agent.SEApp.get_current().canGetProperty(this._propertyName);

    return shetab.ebook.agent.SEApp.get_current().canSetProperty(this._propertyName, value === this._checkedValue ? this._uncheckedValue : this._checkedValue);
};
shetab.ebook.agent.converters.SEEnabledConverter.prototype.convertBack = function (value, targetCtor, parameter)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.ebook.agent.converters.SEMediaTimerConverter = function ()
 {
};
shetab.ebook.agent.converters.SEMediaTimerConverter.prototype.convert = function (value, targetCtor, parameter)
 {
    var format = parameter instanceof String || parameter == null ? parameter : (function ()
    {
        throw new Error("InvalidCastException");
    }());
    if (shetab.ebook.agent.SEApp.get_current().get_mediaLength() === 0)
        return "";
    if (format === null || format === "")
        format = "mm:ss / MM:SS";
    format = shetab.ebook.agent.converters.SEMediaTimerConverter.formatTime(value instanceof Number || value == null ? value : (function ()
    {
        throw new Error("InvalidCastException");
    }()), format);
    format = shetab.ebook.agent.converters.SEMediaTimerConverter.formatTime(shetab.ebook.agent.SEApp.get_current().get_mediaLength(), format.toLowerCase());
    return format;
};
shetab.ebook.agent.converters.SEMediaTimerConverter.prototype.convertBack = function (value, targetCtor, parameter)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.ebook.agent.converters.SEMediaTimerConverter.formatTime = function (milisecond, format)
 {
    var items =  [new shetab.ebook.agent.converters.SEMediaTimerConverter.TimeSymbol("hh", 3600000), new shetab.ebook.agent.converters.SEMediaTimerConverter.TimeSymbol("h", 3600000), new shetab.ebook.agent.converters.SEMediaTimerConverter.TimeSymbol("mm", 60000), new shetab.ebook.agent.converters.SEMediaTimerConverter.TimeSymbol("m", 60000), new shetab.ebook.agent.converters.SEMediaTimerConverter.TimeSymbol("ss", 1000), new shetab.ebook.agent.converters.SEMediaTimerConverter.TimeSymbol("s", 1000)];
    for (var $i2 = 0, $l2 = items.length, timeSymbol = items[$i2]; $i2 < $l2; $i2++, timeSymbol = items[$i2])
    {
        if (format.indexOf(timeSymbol.symbol) !== -1)
        {
            var val = Math.floor(milisecond / timeSymbol.power);
            var valStr = timeSymbol.symbol.length === 2 ? shetab.common.Convert.toStringWithLeadingZero(val, 2) : val.toString();
            if (val === 0 && (timeSymbol.symbol === "h" || timeSymbol.symbol === "hh"))
                valStr = "";
            format = format.replace(timeSymbol.symbol, valStr);
            milisecond -= val * timeSymbol.power;
        }
    }
    format = shetab.common.StringHelper.trim(format, " :");
    return format;
};
if (typeof(shetab.ebook.agent.converters.SEMediaTimerConverter) == "undefined")
    shetab.ebook.agent.converters.SEMediaTimerConverter = {};
shetab.ebook.agent.converters.SEMediaTimerConverter.TimeSymbol = function (symbol, power)
 {
    this.symbol = null;
    this.power = null;
    this.symbol = symbol;
    this.power = power;
};
shetab.ebook.agent.converters.SEPropertyBooleanConverter = function (trueValue, falseValue)
 {
    this._trueValue = null;
    this._falseValue = null;
    this._trueValue = trueValue;
    this._falseValue = falseValue;
};
shetab.ebook.agent.converters.SEPropertyBooleanConverter.prototype.convert = function (value, targetCtor, parameter)
 {
    return value === null || this._trueValue === null ? value === this._trueValue : value.toString() === this._trueValue;
};
shetab.ebook.agent.converters.SEPropertyBooleanConverter.prototype.convertBack = function (value, targetCtor, parameter)
 {
    return value === true ? this._trueValue : this._falseValue;
};
shetab.ebook.agent.SEBinding = function (sourcePropertyName)
 {
    this._mode = shetab.ebook.agent.SEBinding.BindingMode.oneWay;
    this._source = null;
    this._sourcePropertyName = null;
    this._targetPropertyName = null;
    this._target = null;
    this._valueConverter = null;
    this._valueConverterParam = null;
    this.set_mode(shetab.ebook.agent.SEBinding.BindingMode.twoWay);
    this.set_sourcePropertyName(sourcePropertyName);
};
shetab.ebook.agent.SEBinding.prototype.get_mode = function ()
 {
    return this._mode;
};
shetab.ebook.agent.SEBinding.prototype.set_mode = function (value)
 {
    this._mode = value;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "mode", {get: shetab.ebook.agent.SEBinding.prototype.get_mode, set: shetab.ebook.agent.SEBinding.prototype.set_mode, enumerable: true});
shetab.ebook.agent.SEBinding.prototype.get_source = function ()
 {
    return this._source;
};
shetab.ebook.agent.SEBinding.prototype.set_source = function (value)
 {
    this._source = value;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "source", {get: shetab.ebook.agent.SEBinding.prototype.get_source, set: shetab.ebook.agent.SEBinding.prototype.set_source, enumerable: true});
shetab.ebook.agent.SEBinding.prototype.get_sourcePropertyName = function ()
 {
    return this._sourcePropertyName;
};
shetab.ebook.agent.SEBinding.prototype.set_sourcePropertyName = function (value)
 {
    this._sourcePropertyName = value;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "sourcePropertyName", {get: shetab.ebook.agent.SEBinding.prototype.get_sourcePropertyName, set: shetab.ebook.agent.SEBinding.prototype.set_sourcePropertyName, enumerable: true});
shetab.ebook.agent.SEBinding.prototype.get_targetPropertyName = function ()
 {
    return this._targetPropertyName;
};
shetab.ebook.agent.SEBinding.prototype.set_targetPropertyName = function (value)
 {
    this._targetPropertyName = value;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "targetPropertyName", {get: shetab.ebook.agent.SEBinding.prototype.get_targetPropertyName, set: shetab.ebook.agent.SEBinding.prototype.set_targetPropertyName, enumerable: true});
shetab.ebook.agent.SEBinding.prototype.get_target = function ()
 {
    return this._target;
};
shetab.ebook.agent.SEBinding.prototype.set_target = function (value)
 {
    this._target = value;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "target", {get: shetab.ebook.agent.SEBinding.prototype.get_target, set: shetab.ebook.agent.SEBinding.prototype.set_target, enumerable: true});
shetab.ebook.agent.SEBinding.prototype.get_valueConverter = function ()
 {
    return this._valueConverter;
};
shetab.ebook.agent.SEBinding.prototype.set_valueConverter = function (value)
 {
    this._valueConverter = value;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "valueConverter", {get: shetab.ebook.agent.SEBinding.prototype.get_valueConverter, set: shetab.ebook.agent.SEBinding.prototype.set_valueConverter, enumerable: true});
shetab.ebook.agent.SEBinding.prototype.get_valueConverterParam = function ()
 {
    return this._valueConverterParam;
};
shetab.ebook.agent.SEBinding.prototype.set_valueConverterParam = function (value)
 {
    this._valueConverterParam = value;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "valueConverterParam", {get: shetab.ebook.agent.SEBinding.prototype.get_valueConverterParam, set: shetab.ebook.agent.SEBinding.prototype.set_valueConverterParam, enumerable: true});
shetab.ebook.agent.SEBinding.prototype.source_propertyChanged = function (args)
 {
    if (args.get_propertyName() === null || args.get_propertyName() === "" || args.get_propertyName() === this.get_sourcePropertyName())
        this.updateTarget();
};
shetab.ebook.agent.SEBinding.prototype.setBinding = function (target, targetPropertyName)
 {
    this.set_target(target);
    this.set_targetPropertyName(targetPropertyName);

    this.get_source().add_propertyChanged($CreateDelegate(this, this.source_propertyChanged));
    this.update();
};
shetab.ebook.agent.SEBinding.prototype.update = function ()
 {
    switch (this.get_mode())
    {
        case shetab.ebook.agent.SEBinding.BindingMode.oneWay:
        case shetab.ebook.agent.SEBinding.BindingMode.twoWay:
            this.updateTarget();
            break;
        case shetab.ebook.agent.SEBinding.BindingMode.oneWayToSource:
            this.updateSource();
            break;
    }
};
shetab.ebook.agent.SEBinding.prototype.updateTarget = function ()
 {
    if (!this.get_canUpdateTarget())
        throw new Error("Binding mode does not allow update " + this.get_targetPropertyName() + " property of target!");
    try
    {
        var value = this.get_source()[this.get_sourcePropertyName()];
        if (this.get_valueConverter() !== null)
            value = this.get_valueConverter().convert(value, null , this.get_valueConverterParam());
        this.get_target()[this.get_targetPropertyName()] = value;
    }
    catch ($$e1)
    {
        if (this.get_valueConverter()instanceof shetab.ebook.agent.converters.SEEnabledConverter)
            this.get_target()[this.get_targetPropertyName()] = false;
    }
};
shetab.ebook.agent.SEBinding.prototype.updateSource = function ()
 {
    if (!this.get_canUpdateSource())
        throw new Error("Binding mode does not allow update " + this.get_sourcePropertyName() + " property of source!");
    try
    {
        var value = this.get_target()[this.get_targetPropertyName()];
        if (this.get_valueConverter() !== null)
            value = this.get_valueConverter().convertBack(value, null , this.get_valueConverterParam());
        this.get_source()[this.get_sourcePropertyName()] = value;
    }
    catch ($$e2)
    {
    }
};
shetab.ebook.agent.SEBinding.prototype.get_canUpdateTarget = function ()
 {
    return this.get_mode() === shetab.ebook.agent.SEBinding.BindingMode.twoWay || this.get_mode() === shetab.ebook.agent.SEBinding.BindingMode.oneWay;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "canUpdateTarget", {get: shetab.ebook.agent.SEBinding.prototype.get_canUpdateTarget, enumerable: true});
shetab.ebook.agent.SEBinding.prototype.get_canUpdateSource = function ()
 {
    return this.get_mode() === shetab.ebook.agent.SEBinding.BindingMode.twoWay || this.get_mode() === shetab.ebook.agent.SEBinding.BindingMode.oneWayToSource;
};
Object.defineProperty(shetab.ebook.agent.SEBinding.prototype, "canUpdateSource", {get: shetab.ebook.agent.SEBinding.prototype.get_canUpdateSource, enumerable: true});
if (typeof(shetab.ebook.agent.SEBinding) == "undefined")
    shetab.ebook.agent.SEBinding = {};
shetab.ebook.agent.SEBinding.BindingMode = {oneWay: 0, twoWay: 1, oneWayToSource: 2};
shetab.ebook.agent.SECommandManager = function ()
 {
    this._bindedElements =  [];
    this._placeholders =  [];
    this._controls =  [];
};
shetab.ebook.agent.SECommandManager.prototype.initializeModulePlaceholder = function (modulePlaceholderId, moduleUrl)
 {
    var frame = document.getElementById("se_placeholder_" + modulePlaceholderId);
    if (frame !== null && frame.tagName === "IFRAME")
    {
        frame.src = moduleUrl;
        frame.setAttribute("data-shetab-parentInstanceId", shetab.ebook.agent.SEApp.get_current().get_moduleInstanceId());
        return true;
    }
    return false;
};
shetab.ebook.agent.SECommandManager.findPropertyNameIgnoreCase = function (propertyName)
 {
    for (var key in shetab.ebook.agent.SEApp.get_current())
    {
        if (key.toLowerCase() === propertyName.toLowerCase())
            return key;
    }
    return null;
};
shetab.ebook.agent.SECommandManager.findCommandIgnoreCase = function (commandName)
 {
    commandName = shetab.common.StringHelper.trimEnd(commandName, "0123456789");
    for (var $i3 = 0, $t3 = shetab.ebook.agent.SEApp.get_current().get_commands(), $l3 = $t3.length, cmd = $t3[$i3]; $i3 < $l3; $i3++, cmd = $t3[$i3])
    {
        if (cmd.get_name().toLowerCase() === commandName.toLowerCase())
            return cmd;
    }
    return null;
};
shetab.ebook.agent.SECommandManager.prototype.addElement = function (element)
 {
    var elements = element.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++)
        this.addElementHelper(elements[i]instanceof HTMLElement || elements[i] == null ? elements[i] : (function ()
        {
            throw new Error("InvalidCastException");
        }()));
};
shetab.ebook.agent.SECommandManager.prototype.addElementHelper = function (element)
 {
    var elementId = shetab.common.Utility.checkUndefined(element.id, null);
    if (elementId === null)
        return;
    if (this._bindedElements.indexOf(element) !== -1)
    {
        console.warn("Element already bound: " + elementId);
        return;
    }
    if (elementId.length < 2 || elementId.substr(0, 2) !== "se")
        return;
    elementId = elementId.substr(2);
    elementId = shetab.common.StringHelper.trimStart(elementId, "_");
    var placeHolderId = shetab.ebook.agent.SEUtility.getPlaceholderIdFromElementId(element.id);
    if (placeHolderId !== null)
    {
        this._placeholders.push(element);
        this._bindedElements.push(element);
        shetab.ebook.agent.SEApp.get_current().internalCore.addModulePlaceholder(placeHolderId);
        return;
    }
    if (elementId.toLowerCase() === "playMedia".toLowerCase())
        elementId = "mediaState_play";
    else if (elementId.toLowerCase() === "playPauseMedia".toLowerCase())
        elementId = "mediaState_play_pause";
    else if (elementId.toLowerCase() === "pauseMedia".toLowerCase())
        elementId = "mediaState_pause";
    else if (elementId.toLowerCase() === "stopMedia".toLowerCase())
        elementId = "mediaState_stop";
    else if (elementId.toLowerCase() === "volumeSlider".toLowerCase())
        elementId = "soundVolume";
    var control = null;
    var command = shetab.ebook.agent.SECommandManager.findCommandIgnoreCase(elementId);
    if (command !== null)
    {
        control = shetab.ebook.agent.SECommandManager.initCommandBinding(element, command);
        this._controls.push(control);
        this._bindedElements.push(element);
        return;
    }
    var tokens = elementId.split("_");
    var propertyName = tokens.length > 0 ? tokens[0] : elementId;
    var checkedValue = tokens.length > 1 ? tokens[1] : "true";
    var uncheckedValue = tokens.length > 2 ? tokens[2] : "";
    var valueConverter = null;
    propertyName = shetab.common.StringHelper.trimStart(propertyName, "0123456789");
    var source = shetab.ebook.agent.SEApp.get_current();
    var sourcePropertyName = shetab.ebook.agent.SECommandManager.findPropertyNameIgnoreCase(propertyName);
    var isTextElement = shetab.ebook.agent.controls.SEText.isTextElement(element);
    var isSliderElement = shetab.ebook.agent.controls.SESlider.isSliderElement(element);
    switch (sourcePropertyName)
    {
        case "pageCount":
        case "commentTime":
            if (isTextElement)
            {
                element.setAttribute("readonly", "readonly");
            }
            break;
        case "mediaLength":
            if (isTextElement)
            {
                valueConverter = new shetab.ebook.agent.converters.SEMediaTimerConverter();
                element.setAttribute("readonly", "readonly");
            }
            break;
        case "searchQuery":
            if (isTextElement)
            {
                control = shetab.ebook.agent.SECommandManager.initPropertyBinding(element, source, sourcePropertyName, checkedValue, uncheckedValue, null , null);
                control.set_emptyText(shetab.ebook.agent.SEApp.get_current().getResource("Commands", "searchQuery"));
            }

            break;
        case "mediaPosition":
            if (isTextElement)
            {
                valueConverter = new shetab.ebook.agent.converters.SEMediaTimerConverter();
                element.setAttribute("readonly", "readonly");
            }
            else if (isSliderElement)
            {
                var mediaSlider = shetab.ebook.agent.SECommandManager.initPropertyBinding(element, source, sourcePropertyName, checkedValue, uncheckedValue, null , null);
                mediaSlider.set_minimum(0);
                mediaSlider.set_step(1000);
                mediaSlider.set_maximumBinding((function ()
                {
                    var $v57 = new shetab.ebook.agent.SEBinding("mediaLength");
                    $v57.set_mode(shetab.ebook.agent.SEBinding.BindingMode.oneWay);
                    $v57.set_source(shetab.ebook.agent.SEApp.get_current());
                    return $v57;
                }).call(this));
                element.addEventListener("mousedown", $CreateAnonymousDelegate(this, function ()
                {
                    if (mediaSlider.get_isEnabled())
                        shetab.ebook.agent.SEApp.get_current().set_mediaPositionGrabMode(true);
                }), false);
                element.addEventListener("mouseup", $CreateAnonymousDelegate(this, function ()
                {
                    shetab.ebook.agent.SEApp.get_current().set_mediaPositionGrabMode(false);
                }), false);
                control = mediaSlider;
            }
            break;
        case "soundVolume":
            if (isSliderElement)
            {
                var volumeSlider = shetab.ebook.agent.SECommandManager.initPropertyBinding(element, source, sourcePropertyName, checkedValue, uncheckedValue, null , null);
                volumeSlider.set_minimum(0);
                volumeSlider.set_maximum(100);
                volumeSlider.set_step(1);
                control = volumeSlider;
            }
            break;
    }
    if (control === null)
    {
        if (sourcePropertyName === null)
        {
            var newElementId = shetab.ebook.agent.SEApp.get_current().internalCore.convertDeprecatedToken(elementId);
            if (newElementId !== null && newElementId !== "")
            {
                var newElement = document.getElementById(elementId);
                if (newElement !== null)
                    this.addElementHelper(newElement);
                return;
            }
            console.warn("Unknown Shetab eBook element name: " + elementId);
            return;
        }
        control = shetab.ebook.agent.SECommandManager.initPropertyBinding(element, source, sourcePropertyName, checkedValue, uncheckedValue, valueConverter, null);
    }
    this._controls.push(control);
    this._bindedElements.push(element);
};
shetab.ebook.agent.SECommandManager.initPropertyBinding = function (element, source, sourcePropertyName, checkedValue, uncheckedValue, valueConverter, valueConverterParam)
 {
    uncheckedValue = shetab.common.Utility.checkUndefined(uncheckedValue, null);
    checkedValue = shetab.common.Utility.checkUndefined(checkedValue, null);
    valueConverter = shetab.common.Utility.checkUndefined(valueConverter, null);
    valueConverterParam = shetab.common.Utility.checkUndefined(valueConverterParam, null);
    var control;
    var valueBind = (function ()
    {
        var $v58 = new shetab.ebook.agent.SEBinding(sourcePropertyName);
        $v58.set_source(source);
        $v58.set_valueConverter(valueConverter);
        return $v58;
    }).call(this);
    var enabledBind = (function ()
    {
        var $v59 = new shetab.ebook.agent.SEBinding(sourcePropertyName);
        $v59.set_source(source);
        $v59.set_mode(shetab.ebook.agent.SEBinding.BindingMode.oneWay);
        $v59.set_valueConverter(new shetab.ebook.agent.converters.SEEnabledConverter(sourcePropertyName, checkedValue, uncheckedValue));
        return $v59;
    }).call(this);
    if (shetab.ebook.agent.controls.SESlider.isSliderElement(element))
    {
        var slider = (function ()
        {
            var $v60 = new shetab.ebook.agent.controls.SESlider(element);
            $v60.set_valueBinding(valueBind);
            $v60.set_isEnabledBinding(enabledBind);
            return $v60;
        }).call(this);
        control = slider;
    }
    else if (shetab.ebook.agent.controls.SEText.isTextElement(element))
    {
        var textBox = (function ()
        {
            var $v61 = new shetab.ebook.agent.controls.SEText(element);
            $v61.set_isEnabledBinding(enabledBind);
            return $v61;
        }).call(this);
        valueBind.set_mode(textBox.get_readonly() ? shetab.ebook.agent.SEBinding.BindingMode.oneWay : shetab.ebook.agent.SEBinding.BindingMode.twoWay);
        valueBind.set_valueConverterParam((valueConverterParam !== null ? valueConverterParam : textBox.get_text()));
        control = textBox;
    }
    else
    {
        if (valueBind.get_valueConverter() === null)
            valueBind.set_valueConverter(new shetab.ebook.agent.converters.SEPropertyBooleanConverter(checkedValue, uncheckedValue));
        var button = (function ()
        {
            var $v62 = new shetab.ebook.agent.controls.SEButton(element, null);
            $v62.set_isCheckedBinding(valueBind);
            $v62.set_isEnabledBinding(enabledBind);
            return $v62;
        }).call(this);
        control = button;
    }
    return control;
};
shetab.ebook.agent.SECommandManager.initCommandBinding = function (element, command)
 {
    return new shetab.ebook.agent.controls.SEButton(element, command);
};
shetab.ebook.agent.SECommandManager.prototype.init = function ()
 {
    this.addElement(document.body);
};
shetab.ebook.agent.SEDocumentInfo = function ()
 {
    this._link = null;
    this._playerUrl = null;
    this._poolName = null;
    this._url = null;
};
shetab.ebook.agent.SEDocumentInfo.prototype.get_link = function ()
 {
    return this._link;
};
shetab.ebook.agent.SEDocumentInfo.prototype.set_link = function (value)
 {
    this._link = value;
};
Object.defineProperty(shetab.ebook.agent.SEDocumentInfo.prototype, "link", {get: shetab.ebook.agent.SEDocumentInfo.prototype.get_link, set: shetab.ebook.agent.SEDocumentInfo.prototype.set_link, enumerable: true});
shetab.ebook.agent.SEDocumentInfo.prototype.get_playerUrl = function ()
 {
    return this._playerUrl;
};
shetab.ebook.agent.SEDocumentInfo.prototype.set_playerUrl = function (value)
 {
    this._playerUrl = value;
};
Object.defineProperty(shetab.ebook.agent.SEDocumentInfo.prototype, "playerUrl", {get: shetab.ebook.agent.SEDocumentInfo.prototype.get_playerUrl, set: shetab.ebook.agent.SEDocumentInfo.prototype.set_playerUrl, enumerable: true});
shetab.ebook.agent.SEDocumentInfo.prototype.get_poolName = function ()
 {
    return this._poolName;
};
shetab.ebook.agent.SEDocumentInfo.prototype.set_poolName = function (value)
 {
    this._poolName = value;
};
Object.defineProperty(shetab.ebook.agent.SEDocumentInfo.prototype, "poolName", {get: shetab.ebook.agent.SEDocumentInfo.prototype.get_poolName, set: shetab.ebook.agent.SEDocumentInfo.prototype.set_poolName, enumerable: true});
shetab.ebook.agent.SEDocumentInfo.prototype.get_url = function ()
 {
    return this._url;
};
shetab.ebook.agent.SEDocumentInfo.prototype.set_url = function (value)
 {
    this._url = value;
};
Object.defineProperty(shetab.ebook.agent.SEDocumentInfo.prototype, "url", {get: shetab.ebook.agent.SEDocumentInfo.prototype.get_url, set: shetab.ebook.agent.SEDocumentInfo.prototype.set_url, enumerable: true});
shetab.ebook.agent.SEDocumentInfo.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("link");
    info.addString("url");
    info.addString("playerUrl");

    info.addString("poolName");
};
shetab.ebook.agent.SEApp = function ()
 {
    this._commandManager = new shetab.ebook.agent.SECommandManager();
    this.agent = new shetab.ebook.agent.SEApp.SEAgent();
    this.internalCore = new shetab.ebook.agent.api.SEInternalCore();
    this._sessionStorage = null;
    this._localStorage = null;
    this._moduleStorage = null;
    this._moduleEntityStorage = null;
    this._projectStorage = null;
    this._moduleEntityId = null;
    this._propertyBag = null;
    this._moduleInstanceId = null;
    this._sessionName = null;
    this._isInitialized = null;
    this._commands =  [];
    this._messageParser = new shetab.ebook.agent.api.SEMessageParser();
    this._messageDispatcher = new shetab.ebook.agent.SEMessageDispatcher();
    this._commandHandler = null;
    this.updateUI = null;
    this.refreshTopics = null;
    this.initialized = null;
    this.propertyChanged = null;
    this.propertyBagChanged = null;
    this.customNotfiy = null;
    this._isExternalPropertyBagNotificationEnabled = null;
    shetab.ebook.agent.api.SECore.call(this);
    if (shetab.ebook.agent.SEApp.currentField !== null)
        throw new Error("Only one SEApp can be created!");
    shetab.ebook.agent.SEApp.currentField = this;
    seApp = this;
};
shetab.ebook.agent.SEApp.currentField = null;
shetab.ebook.agent.SEApp.get_current = function ()
 {
    return (shetab.ebook.agent.SEApp.currentField !== null ? shetab.ebook.agent.SEApp.currentField : (shetab.ebook.agent.SEApp.currentField = new shetab.ebook.agent.SEApp()));
};
Object.defineProperty(shetab.ebook.agent.SEApp, "current", {get: shetab.ebook.agent.SEApp.get_current, enumerable: true});
shetab.ebook.agent.SEApp.create = function ()
 {
    shetab.ebook.agent.SEApp.currentField = new shetab.ebook.agent.SEApp();
};
shetab.ebook.agent.SEApp.prototype.add_updateUI = function (value)
 {
    this.updateUI = $CombineDelegates(this.updateUI, value);
};
shetab.ebook.agent.SEApp.prototype.remove_updateUI = function (value)
 {
    this.updateUI = $RemoveDelegate(this.updateUI, value);
};
shetab.ebook.agent.SEApp.prototype.add_refreshTopics = function (value)
 {
    this.refreshTopics = $CombineDelegates(this.refreshTopics, value);
};
shetab.ebook.agent.SEApp.prototype.remove_refreshTopics = function (value)
 {
    this.refreshTopics = $RemoveDelegate(this.refreshTopics, value);
};
shetab.ebook.agent.SEApp.prototype.add_initialized = function (value)
 {
    this.initialized = $CombineDelegates(this.initialized, value);
};
shetab.ebook.agent.SEApp.prototype.remove_initialized = function (value)
 {
    this.initialized = $RemoveDelegate(this.initialized, value);
};
shetab.ebook.agent.SEApp.prototype.add_propertyChanged = function (value)
 {
    this.propertyChanged = $CombineDelegates(this.propertyChanged, value);
};
shetab.ebook.agent.SEApp.prototype.remove_propertyChanged = function (value)
 {
    this.propertyChanged = $RemoveDelegate(this.propertyChanged, value);
};
shetab.ebook.agent.SEApp.prototype.add_propertyBagChanged = function (value)
 {
    this.propertyBagChanged = $CombineDelegates(this.propertyBagChanged, value);
};
shetab.ebook.agent.SEApp.prototype.remove_propertyBagChanged = function (value)
 {
    this.propertyBagChanged = $RemoveDelegate(this.propertyBagChanged, value);
};
shetab.ebook.agent.SEApp.prototype.add_customNotfiy = function (value)
 {
    this.customNotfiy = $CombineDelegates(this.customNotfiy, value);
};
shetab.ebook.agent.SEApp.prototype.remove_customNotfiy = function (value)
 {
    this.customNotfiy = $RemoveDelegate(this.customNotfiy, value);
};
shetab.ebook.agent.SEApp.prototype.get_sessionStorage = function ()
 {
    return (this._sessionStorage !== null ? this._sessionStorage : (this._sessionStorage = (function ()
    {
        var $v63 = new shetab.ebook.agent.api.SEStorage();
        $v63.set_context("session");
        return $v63;
    }).call(this)));
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "sessionStorage", {get: shetab.ebook.agent.SEApp.prototype.get_sessionStorage, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_localStorage = function ()
 {
    return (this._localStorage !== null ? this._localStorage : (this._localStorage = (function ()
    {
        var $v64 = new shetab.ebook.agent.api.SEStorage();
        $v64.set_context("local");
        return $v64;
    }).call(this)));
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "localStorage", {get: shetab.ebook.agent.SEApp.prototype.get_localStorage, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_moduleStorage = function ()
 {
    return (this._moduleStorage !== null ? this._moduleStorage : (this._moduleStorage = (function ()
    {
        var $v65 = new shetab.ebook.agent.api.SEStorage();
        $v65.set_context("module");
        return $v65;
    }).call(this)));
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "moduleStorage", {get: shetab.ebook.agent.SEApp.prototype.get_moduleStorage, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_moduleEntityStorage = function ()
 {
    return (this._moduleEntityStorage !== null ? this._moduleEntityStorage : (this._moduleEntityStorage = (function ()
    {
        var $v66 = new shetab.ebook.agent.api.SEStorage();
        $v66.set_context("moduleEntity");
        return $v66;
    }).call(this)));
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "moduleEntityStorage", {get: shetab.ebook.agent.SEApp.prototype.get_moduleEntityStorage, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_projectStorage = function ()
 {
    return (this._projectStorage !== null ? this._projectStorage : (this._projectStorage = this._projectStorage = (function ()
    {
        var $v67 = new shetab.ebook.agent.api.SEStorage();
        $v67.set_context("project");
        return $v67;
    }).call(this)));
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "projectStorage", {get: shetab.ebook.agent.SEApp.prototype.get_projectStorage, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_propertyBag = function ()
 {
    return (this._propertyBag !== null ? this._propertyBag : (this._propertyBag = new shetab.ebook.agent.SEPropertyBagImpl(this.get_moduleEntityId())));
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "propertyBag", {get: shetab.ebook.agent.SEApp.prototype.get_propertyBag, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_moduleEntityId = function ()
 {
    return this._moduleEntityId;
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "moduleEntityId", {get: shetab.ebook.agent.SEApp.prototype.get_moduleEntityId, enumerable: true});
shetab.ebook.agent.SEApp.prototype.sendDataToEngine = function (data)
 {
    return shetabEbookSendDataToEngine(data);
};
shetab.ebook.agent.SEApp.prototype.sendMessageToEngine = function (message)
 {
    return shetabEbookSendMessageToEngine(message);
};
shetab.ebook.agent.SEApp.prototype.sendMessageToAgent = function (message)
 {
    try
    {
        var ret = this._messageParser.processMessage$$SEMessage(message);
        if (message.targetInstanceId !== this.get_moduleInstanceId() && (ret === shetab.ebook.common.SEMessage.c_undefined || ret === shetab.ebook.common.SEMessage.c_unhandled))
            ret = this.get_messageDispatcher().sendMessageToAgent(message);
        return ret;
    }
    catch (e)
    {
        if (!shetab.common.Utility.isTypeOf(e,  shetab.common.error.DoDefaultError))
            console.error(e.stack);
        return "$$error: " + e.name + "; " + e.message;
    }
};
shetab.ebook.agent.SEApp.prototype.sendDataToAgent = function (data)
 {
    try
    {
        var ret = this._messageParser.processMessage$$String(data);

        if (ret === shetab.ebook.common.SEMessage.c_undefined || ret === shetab.ebook.common.SEMessage.c_unhandled)
            ret = this.get_messageDispatcher().sendDataToAgent(data);
        return ret;
    }
    catch (e)
    {
        if (!shetab.common.Utility.isTypeOf(e,  shetab.common.error.DoDefaultError))
            console.error(e.stack);
        return "$$error: " + e.name + "; " + e.message;
    }
};
shetab.ebook.agent.SEApp.prototype.get_moduleInstanceId = function ()
 {
    return this._moduleInstanceId;
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "moduleInstanceId", {get: shetab.ebook.agent.SEApp.prototype.get_moduleInstanceId, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_sessionName = function ()
 {
    return this._sessionName;
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "sessionName", {get: shetab.ebook.agent.SEApp.prototype.get_sessionName, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_isInitialized = function ()
 {
    return this._isInitialized;
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "isInitialized", {get: shetab.ebook.agent.SEApp.prototype.get_isInitialized, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_isExternalPropertyBagNotificationEnabled = function ()
 {
    return this._isExternalPropertyBagNotificationEnabled;
};
shetab.ebook.agent.SEApp.prototype.set_isExternalPropertyBagNotificationEnabled = function (value)
 {
    this._isExternalPropertyBagNotificationEnabled = value;
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "isExternalPropertyBagNotificationEnabled", {get: shetab.ebook.agent.SEApp.prototype.get_isExternalPropertyBagNotificationEnabled, set: shetab.ebook.agent.SEApp.prototype.set_isExternalPropertyBagNotificationEnabled, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_commands = function ()
 {
    return this._commands;
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "commands", {get: shetab.ebook.agent.SEApp.prototype.get_commands, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_messageDispatcher = function ()
 {
    return this._messageDispatcher;
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "messageDispatcher", {get: shetab.ebook.agent.SEApp.prototype.get_messageDispatcher, enumerable: true});
shetab.ebook.agent.SEApp.prototype.get_isShetabEbookHost = function ()
 {
    return this.get_moduleInstanceId() !== null;
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "isShetabEbookHost", {get: shetab.ebook.agent.SEApp.prototype.get_isShetabEbookHost, enumerable: true});
shetab.ebook.agent.SEApp.prototype.init = function (sessionName)
 {
    this._sessionName = shetab.common.Utility.checkUndefined(sessionName, null);
    if (this.get_isInitialized())
        throw new Error("seApp already initialized!");
    var parentApp = window.frameElement !== null && parent["seApp"] !== undefined ? parent["seApp"] : null;
    if (parentApp !== null)
        parentApp.get_messageDispatcher().addIFrame(window);
    this._isInitialized = true;
    this._sessionName = sessionName;
    for (var $i4 = 0, $t4 = this.getAllCommandNames(), $l4 = $t4.length, name = $t4[$i4]; $i4 < $l4; $i4++, name = $t4[$i4])
        this.get_commands().push(new shetab.ebook.agent.SECommand(name));
    var frame = window.frameElement;
    this._moduleInstanceId = frame !== null ? this.internalCore.initializeModule(agentVersion, window.location.href, frame.getAttribute("data-shetab-parentInstanceId"), shetab.ebook.agent.SEUtility.getPlaceholderIdFromElementId(frame.id), sessionName) : this.internalCore.initializeModule(agentVersion, window.location.href, null , null , null);
    if (this._moduleInstanceId === undefined)
        this._moduleInstanceId = null;
    this._moduleEntityId = shetab.ebook.agent.api.SECore.prototype.get_moduleEntityId.call(this);
    if (this._sessionName === null || this._sessionName === "")
        this._sessionName = this._moduleInstanceId;
    if (!this.get_isShetabEbookHost())
        this.internalCore.setProperty("books", shetab.ebook.agent.SEBook.get_sampleXml());
    this._commandManager.init();
    this.add_updateUI($CreateDelegate(this, this.onUpdateUI));
    window.addEventListener("focus", $CreateAnonymousDelegate(this, function (evt)
    {
        this.internalCore.activateModule(true);
    }), true);
    window.addEventListener("unload", $CreateAnonymousDelegate(this, function (evt)
    {
        this.internalCore.uninitializeModule();
    }));
    if (this.initialized !== null)
        this.initialized();
};
shetab.ebook.agent.SEApp.prototype.onUpdateUI = function ()
 {
    this.invalidateRequery();
};
shetab.ebook.agent.SEApp.prototype.invalidateRequery = function ()
 {
    for (var $i5 = 0, $t5 = this.get_commands(), $l5 = $t5.length, command = $t5[$i5]; $i5 < $l5; $i5++, command = $t5[$i5])
        if (command.get_isUsedYet())
            command.invalidateRequery();
};
shetab.ebook.agent.SEApp.prototype.get_commandHandler = function ()
 {
    return this._commandHandler;
};
shetab.ebook.agent.SEApp.prototype.set_commandHandler = function (value)
 {
    this._commandHandler = value;
    var interfaces =  [];
    var proto = Object.getPrototypeOf(value);
    if (proto.hasOwnProperty("open"))
        interfaces.push("IDocumentCommandHandler");
    if (proto.hasOwnProperty("mediaState"))
        interfaces.push("IMediaCommandHandler");
    if (proto.hasOwnProperty("pageCount") || proto.hasOwnProperty("pageNumber"))
        interfaces.push("IPageCommandHandler");
    if (proto.hasOwnProperty("canPrint") || proto.hasOwnProperty("canPrintPreview") || proto.hasOwnProperty("canPrintSetup"))
        interfaces.push("IPrintCommandHandler");
    if (proto.hasOwnProperty("canHighlightTexts") || proto.hasOwnProperty("selectedText"))
        interfaces.push("ITextCommandHandler");
    if (proto.hasOwnProperty("canZoomIn") || proto.hasOwnProperty("canZoomOut") || proto.hasOwnProperty("canSetZoomMode") || proto.hasOwnProperty("zoom"))
        interfaces.push("IZoomCommandHandler");
    if (proto.hasOwnProperty("canCopy") || proto.hasOwnProperty("canCut") || proto.hasOwnProperty("canDel") || proto.hasOwnProperty("canPaste") || proto.hasOwnProperty("canSelectAll"))
        interfaces.push("IEditCommandHandler");
    this.internalCore.initializeCommandHandler(interfaces);
};
Object.defineProperty(shetab.ebook.agent.SEApp.prototype, "commandHandler", {get: shetab.ebook.agent.SEApp.prototype.get_commandHandler, set: shetab.ebook.agent.SEApp.prototype.set_commandHandler, enumerable: true});
shetab.ebook.agent.SEApp.prototype.doDefault = function ()
 {
    throw $CreateException(new shetab.common.error.DoDefaultError(), new Error());
};
shetab.ebook.agent.SEApp.prototype.getPropertyBag = function (moduleEntityId, doneCallback)
 {
    shetab.ebook.agent.api.SECore.prototype.getPropertyBag.call(this, moduleEntityId, $CreateAnonymousDelegate(this, function (param)
    {
        if (param.success)
            param.response = new shetab.ebook.agent.SEPropertyBagImpl(moduleEntityId);
        doneCallback(param);
    }));
};
$Inherit(shetab.ebook.agent.SEApp, shetab.ebook.agent.api.SECore);
if (typeof(shetab.ebook.agent.SEApp) == "undefined")
    shetab.ebook.agent.SEApp = {};
shetab.ebook.agent.SEApp.SEAgent = function ()
 {
};
shetab.ebook.agent.SEApp.SEAgent.prototype.fireUpdateUI = function ()
 {
    if (shetab.ebook.agent.SEApp.get_current().updateUI !== null)
        shetab.ebook.agent.SEApp.get_current().updateUI();
};
shetab.ebook.agent.SEApp.SEAgent.prototype.fireRefreshTopics = function ()
 {
    if (shetab.ebook.agent.SEApp.get_current().refreshTopics !== null)
        shetab.ebook.agent.SEApp.get_current().refreshTopics();
};

shetab.ebook.agent.SEApp.SEAgent.prototype.fireCustomNotify = function (notifyName, notifyValue)
 {
    if (shetab.ebook.agent.SEApp.get_current().customNotfiy !== null)
        shetab.ebook.agent.SEApp.get_current().customNotfiy(notifyName, notifyValue);
};
shetab.ebook.agent.SEApp.SEAgent.prototype.initializeModulePlaceholder = function (modulePlaceholderId, moduleUrl)
 {
    shetab.ebook.agent.SEApp.get_current()._commandManager.initializeModulePlaceholder(modulePlaceholderId, moduleUrl);
};
shetab.ebook.agent.SEApp.SEAgent.prototype.firePropertiesChanged = function (properties)
 {
    if (shetab.ebook.agent.SEApp.get_current().propertyChanged === null)
        return;
    for (var i = 0; i < properties.length; i++)
        shetab.ebook.agent.SEApp.get_current().propertyChanged(new shetab.common.componentModel.PropertyChangedEventHandlerArgs(properties[i]));
};
shetab.ebook.agent.SEApp.SEAgent.prototype.isModuleInstanceExists = function (moduleInstanceId)
 {
    if (shetab.ebook.agent.SEApp.get_current().get_moduleInstanceId() === moduleInstanceId)
        return true;
    throw new Error("isModuleInstanceExists called with invalid instanceId");
};
shetab.ebook.agent.SEApp.SEAgent.prototype.firePropertyBagChanged = function (moduleEntities, changeSetId)
 {
    if (shetab.ebook.agent.SEApp.get_current().propertyBagChanged === null)
        return;
    if (shetab.ebook.agent.SEApp.get_current().get_isExternalPropertyBagNotificationEnabled())
    {
        shetab.ebook.agent.SEApp.get_current().propertyBagChanged(new shetab.ebook.agent.SEPropertyBagChangedEventHandlerArgs(null , changeSetId));
        return;
    }
    var curModuleEntityId = shetab.ebook.agent.SEApp.get_current().get_moduleEntityId();
    for (var $i6 = 0, $l6 = moduleEntities.length, moduleEntityId = moduleEntities[$i6]; $i6 < $l6; $i6++, moduleEntityId = moduleEntities[$i6])
    {
        if (moduleEntityId === curModuleEntityId || moduleEntityId === null)
            shetab.ebook.agent.SEApp.get_current().propertyBagChanged(new shetab.ebook.agent.SEPropertyBagChangedEventHandlerArgs(moduleEntityId, changeSetId));
    }
};
shetab.ebook.agent.SEApp.SEAgent.prototype.invokeStorageCallback = function (callbackId, success, statusText, responseText, responseByteArray, type)
 {
    shetab.ebook.common.SEMessage.getFunctionFromCallbackId(callbackId)(new shetab.ebook.agent.StorageCallbackParam(success, statusText, (type === "byteArray") ? responseByteArray : responseText, type));
};
shetab.ebook.agent.SEBook = function ()
 {
    this._bookFileUrl = null;
    this._culture = null;
    this._dataFolderUrl = null;
    this._iconSetsFolderUrl = null;
    this._id = null;
    this._title = null;
    this._iconSets = null;
};
shetab.ebook.agent.SEBook.prototype.get_bookFileUrl = function ()
 {
    return this._bookFileUrl;
};
shetab.ebook.agent.SEBook.prototype.set_bookFileUrl = function (value)
 {
    this._bookFileUrl = value;
};
Object.defineProperty(shetab.ebook.agent.SEBook.prototype, "bookFileUrl", {get: shetab.ebook.agent.SEBook.prototype.get_bookFileUrl, set: shetab.ebook.agent.SEBook.prototype.set_bookFileUrl, enumerable: true});
shetab.ebook.agent.SEBook.prototype.get_culture = function ()
 {
    return this._culture;
};
shetab.ebook.agent.SEBook.prototype.set_culture = function (value)
 {
    this._culture = value;
};
Object.defineProperty(shetab.ebook.agent.SEBook.prototype, "culture", {get: shetab.ebook.agent.SEBook.prototype.get_culture, set: shetab.ebook.agent.SEBook.prototype.set_culture, enumerable: true});
shetab.ebook.agent.SEBook.prototype.get_dataFolderUrl = function ()
 {
    return this._dataFolderUrl;
};
shetab.ebook.agent.SEBook.prototype.set_dataFolderUrl = function (value)
 {
    this._dataFolderUrl = value;
};
Object.defineProperty(shetab.ebook.agent.SEBook.prototype, "dataFolderUrl", {get: shetab.ebook.agent.SEBook.prototype.get_dataFolderUrl, set: shetab.ebook.agent.SEBook.prototype.set_dataFolderUrl, enumerable: true});
shetab.ebook.agent.SEBook.prototype.get_iconSetsFolderUrl = function ()
 {
    return this._iconSetsFolderUrl;
};
shetab.ebook.agent.SEBook.prototype.set_iconSetsFolderUrl = function (value)
 {
    this._iconSetsFolderUrl = value;
};
Object.defineProperty(shetab.ebook.agent.SEBook.prototype, "iconSetsFolderUrl", {get: shetab.ebook.agent.SEBook.prototype.get_iconSetsFolderUrl, set: shetab.ebook.agent.SEBook.prototype.set_iconSetsFolderUrl, enumerable: true});
shetab.ebook.agent.SEBook.prototype.get_id = function ()
 {
    return this._id;
};
shetab.ebook.agent.SEBook.prototype.set_id = function (value)
 {
    this._id = value;
};
Object.defineProperty(shetab.ebook.agent.SEBook.prototype, "id", {get: shetab.ebook.agent.SEBook.prototype.get_id, set: shetab.ebook.agent.SEBook.prototype.set_id, enumerable: true});
shetab.ebook.agent.SEBook.prototype.get_title = function ()
 {
    return this._title;
};
shetab.ebook.agent.SEBook.prototype.set_title = function (value)
 {
    this._title = value;
};
Object.defineProperty(shetab.ebook.agent.SEBook.prototype, "title", {get: shetab.ebook.agent.SEBook.prototype.get_title, set: shetab.ebook.agent.SEBook.prototype.set_title, enumerable: true});
shetab.ebook.agent.SEBook.prototype.get_iconSets = function ()
 {
    return this._iconSets;
};
shetab.ebook.agent.SEBook.prototype.set_iconSets = function (value)
 {
    this._iconSets = value;
};
Object.defineProperty(shetab.ebook.agent.SEBook.prototype, "iconSets", {get: shetab.ebook.agent.SEBook.prototype.get_iconSets, set: shetab.ebook.agent.SEBook.prototype.set_iconSets, enumerable: true});
shetab.ebook.agent.SEBook.get_sampleXml = function ()
 {
    return "<Books><Book Id=\'{00000000-0000-0000-0000-000000000000}\'><Title>Test Book Title</Title></Book></Books>";
};
Object.defineProperty(shetab.ebook.agent.SEBook, "sampleXml", {get: shetab.ebook.agent.SEBook.get_sampleXml, enumerable: true});
shetab.ebook.agent.SEBook.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("bookFileUrl");
    info.addString("culture");
    info.addString("dataFolderUrl");
    info.addString("iconSetsFolderUrl");
    info.addString("id");
    info.addString("title");
    info.addDictionary("iconSets",  shetab.ebook.agent.SEIconSet, "iconSet", "id");
};
shetab.ebook.agent.SECommand = function (name)
 {
    this._isUpdateNeeded = true;
    this._name = null;
    this._isUsedYet = false;
    this._canExecute = false;
    this.canExecuteChanged = null;
    this._name = name;
};
shetab.ebook.agent.SECommand.prototype.add_canExecuteChanged = function (value)
 {
    this.canExecuteChanged = $CombineDelegates(this.canExecuteChanged, value);
};
shetab.ebook.agent.SECommand.prototype.remove_canExecuteChanged = function (value)
 {
    this.canExecuteChanged = $RemoveDelegate(this.canExecuteChanged, value);
};
shetab.ebook.agent.SECommand.prototype.get_name = function ()
 {
    return this._name;
};
Object.defineProperty(shetab.ebook.agent.SECommand.prototype, "name", {get: shetab.ebook.agent.SECommand.prototype.get_name, enumerable: true});
shetab.ebook.agent.SECommand.prototype.get_isUsedYet = function ()
 {
    return this._isUsedYet;
};
Object.defineProperty(shetab.ebook.agent.SECommand.prototype, "isUsedYet", {get: shetab.ebook.agent.SECommand.prototype.get_isUsedYet, enumerable: true});
shetab.ebook.agent.SECommand.prototype.get_canExecute = function ()
 {
    if (this._isUpdateNeeded)
        this.update();
    return this._canExecute;
};
Object.defineProperty(shetab.ebook.agent.SECommand.prototype, "canExecute", {get: shetab.ebook.agent.SECommand.prototype.get_canExecute, enumerable: true});
shetab.ebook.agent.SECommand.prototype.update = function ()
 {
    this._isUpdateNeeded = false;
    this._canExecute = shetab.ebook.agent.SEApp.get_current().canExecuteCommand(this.get_name());

    this._isUsedYet = true;
};
shetab.ebook.agent.SECommand.prototype.execute = function ()
 {
    shetab.ebook.agent.SEApp.get_current().executeCommand(this.get_name());
    this.invalidateRequery();
};
shetab.ebook.agent.SECommand.prototype.invalidateRequery = function ()
 {
    var canExecuteT = this._canExecute;
    this.update();
    if (canExecuteT !== this.get_canExecute() && this.canExecuteChanged !== null)
        this.canExecuteChanged();
};
shetab.ebook.agent.SEIconSet = function ()
 {
    this._collapseUrl = null;
    this._expandUrl = null;
    this._singleUrl = null;
};
shetab.ebook.agent.SEIconSet.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("collapseUrl");
    info.addString("expandUrl");
    info.addString("singleUrl");
};
shetab.ebook.agent.SEIconSet.prototype.get_collapseUrl = function ()
 {
    return this._collapseUrl;
};
shetab.ebook.agent.SEIconSet.prototype.set_collapseUrl = function (value)
 {
    this._collapseUrl = value;
};
Object.defineProperty(shetab.ebook.agent.SEIconSet.prototype, "collapseUrl", {get: shetab.ebook.agent.SEIconSet.prototype.get_collapseUrl, set: shetab.ebook.agent.SEIconSet.prototype.set_collapseUrl, enumerable: true});
shetab.ebook.agent.SEIconSet.prototype.get_expandUrl = function ()
 {
    return this._expandUrl;
};
shetab.ebook.agent.SEIconSet.prototype.set_expandUrl = function (value)
 {
    this._expandUrl = value;
};
Object.defineProperty(shetab.ebook.agent.SEIconSet.prototype, "expandUrl", {get: shetab.ebook.agent.SEIconSet.prototype.get_expandUrl, set: shetab.ebook.agent.SEIconSet.prototype.set_expandUrl, enumerable: true});
shetab.ebook.agent.SEIconSet.prototype.get_singleUrl = function ()
 {
    return this._singleUrl;
};
shetab.ebook.agent.SEIconSet.prototype.set_singleUrl = function (value)
 {
    this._singleUrl = value;
};
Object.defineProperty(shetab.ebook.agent.SEIconSet.prototype, "singleUrl", {get: shetab.ebook.agent.SEIconSet.prototype.get_singleUrl, set: shetab.ebook.agent.SEIconSet.prototype.set_singleUrl, enumerable: true});
if (typeof(shetab.ebook.common) == "undefined")
    shetab.ebook.common = {};
shetab.ebook.common.SEMessage = function ()
 {
    this.targetInstanceId = null;
    this.callerInstanceId = null;
    this.context = null;
    this.typeName = null;
    this.methodName = null;
    this.parameters = null;
    this.parameters = new Object();
};
shetab.ebook.common.SEMessage.c_unhandled = "$$unhandled";
shetab.ebook.common.SEMessage.c_undefined = "$$undefined";
shetab.ebook.common.SEMessage.c_error = "$$error";
shetab.ebook.common.SEMessage.c_null = "$$null";
shetab.ebook.common.SEMessage._lastCallbackId = 0;
shetab.ebook.common.SEMessage.callbacks = new Object();
shetab.ebook.common.SEMessage.prepareResult = function (value)
 {
    if (shetab.common.StringHelper.startsWith(value, shetab.ebook.common.SEMessage.c_error))
    {
        var startIndex = value.indexOf(":");
        var endIndex = value.indexOf(";", startIndex);
        if (endIndex === -1)
            endIndex = value.length;
        var errorName = value.substring(startIndex + 1, endIndex).trim();
        if (errorName === shetab.common.error.NotImplementedError.errorName)
            throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
        if (errorName === shetab.common.error.NotSupportedError.errorName)
            throw $CreateException(new shetab.common.error.NotSupportedError(), new Error());
        if (errorName === shetab.common.error.DoDefaultError.errorName)
            throw $CreateException(new shetab.common.error.DoDefaultError(), new Error());
        throw new Error(value.substr(shetab.ebook.common.SEMessage.c_error.length + 1));
    }
    if (value === shetab.ebook.common.SEMessage.c_undefined)
        value = undefined;
    if (value === shetab.ebook.common.SEMessage.c_null)
        value = null;
    return value;
};
shetab.ebook.common.SEMessage.prototype.toXml = function ()
 {
    var xmlDoc = shetab.common.Xml.createXmlDoc("seMessage");
    shetab.common.serialization.Serializer.serialize(this, xmlDoc.documentElement);
    return shetab.common.Xml.toXmlString(xmlDoc);
};
shetab.ebook.common.SEMessage.fromXml = function (xml)
 {
    var xmlDoc = shetab.common.Xml.loadXmlString(xml);
    var ret = new shetab.ebook.common.SEMessage();
    shetab.common.serialization.Serializer.deserialize(ret, xmlDoc.documentElement);
    return ret;
};
shetab.ebook.common.SEMessage.prototype.getSerializationInfo = function (info, serializeContext)
 {
    info.addString("targetInstanceId");
    info.addString("methodName");
    info.addString("typeName");
    info.addString("context");
    var instanceIdPi = info.addString("callerInstanceId");
    instanceIdPi.set_elementName("caller");
    instanceIdPi.set_attributeName("instanceId");
    info.addDictionary("parameters",  shetab.ebook.common.SEMessage.Parameter, "param", "name").set_collectionElementName("params");
};
shetab.ebook.common.SEMessage.prototype.getParam = function (paramName, defValue)
 {
    defValue = shetab.common.Utility.checkUndefined(defValue, null);
    var res = this.parameters[paramName];
    if (!shetab.common.Utility.isDefined(res))
        return defValue;
    var ret = (res.valueCDATA !== null ? res.valueCDATA : res.value);
    return ret === shetab.ebook.common.SEMessage.c_null ? null : ret;
};
shetab.ebook.common.SEMessage.prototype.getParamByteArray = function (paramName)
 {
    var ret = this.parameters[paramName];
    if (!shetab.common.Utility.isDefined(ret))
        return null;
    return ret.valueByteArray;
};
shetab.ebook.common.SEMessage.prototype.setParam = function (paramName, value, useCDATA)
 {
    value = (value !== null ? value : shetab.ebook.common.SEMessage.c_null);
    useCDATA = shetab.common.Utility.checkUndefined(useCDATA, false);
    this.parameters[paramName] = useCDATA ? (function ()
    {
        var $v68 = new shetab.ebook.common.SEMessage.Parameter();
        $v68.valueCDATA = value;
        return $v68;
    }).call(this) : (function ()
    {
        var $v69 = new shetab.ebook.common.SEMessage.Parameter();
        $v69.value = value;
        return $v69;
    }).call(this);
};
shetab.ebook.common.SEMessage.prototype.setParamByteArray = function (paramName, value)
 {
    this.parameters[paramName] = (function ()
    {
        var $v70 = new shetab.ebook.common.SEMessage.Parameter();
        $v70.valueByteArray = value;
        return $v70;
    }).call(this);
};
shetab.ebook.common.SEMessage.array_toString = function (items)
 {
    var converter = (function ()
    {
        var $v71 = new shetab.common.converters.ObjectConverter();
        $v71.nullValue = shetab.ebook.common.SEMessage.c_null;
        $v71.serializerRootElementName = "item";
        return $v71;
    }).call(this);
    var strings =  [];
    for (var $i7 = 0, $l7 = items.length, item = items[$i7]; $i7 < $l7; $i7++, item = items[$i7])
        strings.push(converter.convert(item, null , null));
    return strings.length === 0 ? "" : strings.join("#$$;");
};
shetab.ebook.common.SEMessage.array_fromString = function (value, typeCtor)
 {
    var converter = (function ()
    {
        var $v72 = new shetab.common.converters.ObjectConverter();
        $v72.nullValue = shetab.ebook.common.SEMessage.c_null;
        $v72.serializerRootElementName = "item";
        return $v72;
    }).call(this);
    var strings = value === "" ?  [] : value.split("#$$;");
    var items =  [];
    for (var $i8 = 0, $l8 = strings.length, item = strings[$i8]; $i8 < $l8; $i8++, item = strings[$i8])
        items.push(converter.convertBack(item, typeCtor, null));
    return items;
};
shetab.ebook.common.SEMessage.dictionary_toString = function (items)
 {
    var converter = (function ()
    {

        var $v73 = new shetab.common.converters.ObjectConverter();
        $v73.nullValue = shetab.ebook.common.SEMessage.c_null;
        $v73.serializerRootElementName = "item";
        return $v73;
    }).call(this);
    var strings =  [];
    for (var item in items)
        strings.push(item + "#$$!;" + converter.convert(items[item], null , null));
    return strings.length === 0 ? "" : strings.join("#$$;");
};
shetab.ebook.common.SEMessage.dictionary_fromString = function (value, typeCtor)
 {
    var converter = (function ()
    {
        var $v74 = new shetab.common.converters.ObjectConverter();
        $v74.nullValue = shetab.ebook.common.SEMessage.c_null;
        $v74.serializerRootElementName = "item";
        return $v74;
    }).call(this);
    var strings = value === "" ?  [] : value.split("#$$;");
    var items = new Object();
    for (var $i9 = 0, $l9 = strings.length, item = strings[$i9]; $i9 < $l9; $i9++, item = strings[$i9])
    {
        var tokens = item.split("#$$!;");
        items[tokens[0]] = converter.convertBack(tokens[1], typeCtor, null);
    }
    return items;
};
shetab.ebook.common.SEMessage.getCallbackIdFromFunction = function (callback)
 {
    var callbackId = (++shetab.ebook.common.SEMessage._lastCallbackId).toString();
    shetab.ebook.common.SEMessage.callbacks[callbackId] = callback;
    return callbackId;
};
shetab.ebook.common.SEMessage.getFunctionFromCallbackId = function (callbackId)
 {
    return shetab.common.Utility.checkUndefined(shetab.ebook.common.SEMessage.callbacks[callbackId], null);
};
if (typeof(shetab.ebook.common.SEMessage) == "undefined")
    shetab.ebook.common.SEMessage = {};
shetab.ebook.common.SEMessage.Parameter = function ()
 {
    this.value = null;
    this.valueCDATA = null;
    this.valueByteArray = null;
};
shetab.ebook.common.SEMessage.Parameter.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("value").set_attributeName(null);
    info.addByteArray("valueByteArray");
    var cdataInfo = info.addString("valueCDATA");
    cdataInfo.set_attributeName(shetab.common.serialization.SerializationInfo.tagCDATA);
};
shetab.ebook.agent.SEPropertyBagImpl = function (moduleEntityId)
 {
    shetab.ebook.agent.api.SEPropertyBag.call(this);
    this.set_context(moduleEntityId);
};
shetab.ebook.agent.SEPropertyBagImpl.getCtorByTypeName = function (typeName)
 {
    switch (typeName.toLowerCase())
    {
        case "font":
            return  shetab.common.Font;
        case "color":
            return  shetab.common.Color;
        case "boolean":
            return  Boolean;
        case "number":
            return  Number;
        default :
            return  String;
    }
};
shetab.ebook.agent.SEPropertyBagImpl.unformatValue = function (result)
 {
    var commaIndex = result.indexOf(",");
    var type = result.substr(0, commaIndex);
    var value = result.substr(commaIndex + 1);
    if (value === "$$default")
        return value;
    return value === shetab.ebook.common.SEMessage.c_null ? null : new shetab.common.converters.ObjectConverter().convertBack(value, shetab.ebook.agent.SEPropertyBagImpl.getCtorByTypeName(type), null);
};
shetab.ebook.agent.SEPropertyBagImpl.prototype.getProperty = function (propertyName, itemId, propertySetId)
 {
    return shetab.ebook.agent.SEPropertyBagImpl.unformatValue(shetab.ebook.agent.api.SEPropertyBag.prototype.getPropertyRaw.call(this, propertyName, itemId, propertySetId));
};
shetab.ebook.agent.SEPropertyBagImpl.prototype.getProperties = function (itemId, propertySetId)
 {
    var ret = new Object();
    shetab.ebook.agent.api.SEPropertyBag.prototype.getPropertiesRaw.call(this, itemId, propertySetId);
    var properties = shetab.ebook.agent.api.SEPropertyBag.prototype.getPropertiesRaw.call(this, itemId, propertySetId);
    for (var propertyName in properties)
        ret[propertyName] = shetab.ebook.agent.SEPropertyBagImpl.unformatValue(properties[propertyName]);
    return ret;
};
shetab.ebook.agent.SEPropertyBagImpl.prototype.setProperty = function (propertyName, value, itemId, propertySetId)
 {
    if (shetab.common.Utility.isTypeOf(value,  String) && value.trim().length === 0)
        value = null;
    var objConverter = new shetab.common.converters.ObjectConverter();
    shetab.ebook.agent.api.SEPropertyBag.prototype.setPropertyRaw.call(this, propertyName, objConverter.convert(value, null , null), itemId, propertySetId);
};
$Inherit(shetab.ebook.agent.SEPropertyBagImpl, shetab.ebook.agent.api.SEPropertyBag);
shetab.ebook.agent.SETopic = function ()
 {
};
shetab.ebook.agent.SEMessageDispatcher = function ()
 {
    this._flashObjects =  [];
    this._iframes =  [];
    this._silverlightObjects =  [];
};
shetab.ebook.agent.SEMessageDispatcher.prototype.bindAll = function ()
 {
    var flashObjects = shetab.ebook.agent.SEMessageDispatcher.getAllObjects("TotalFrames");
    for (var i = 0; i < flashObjects.length; i++)
    {
        this.addFlash(flashObjects[i]);
    }
    var silverlightObjects = shetab.ebook.agent.SEMessageDispatcher.getAllObjects("Content");
    for (var i = 0; i < silverlightObjects.length; i++)
    {
        this.addSilverlight(silverlightObjects[i]);
    }
};
shetab.ebook.agent.SEMessageDispatcher.prototype.addIFrame = function (obj)
 {
    this._iframes.push(obj);
    obj["shetabEbookSendDataToEngine"] =  shetabEbookSendDataToEngine;
    obj["shetabEbookSendMessageToEngine"] =  shetabEbookSendMessageToEngine;
};
shetab.ebook.agent.SEMessageDispatcher.prototype.addSilverlight = function (obj)
 {
    this._silverlightObjects.push(obj);
};
shetab.ebook.agent.SEMessageDispatcher.prototype.addFlash = function (obj)
 {
    this._flashObjects.push(obj);
};
shetab.ebook.agent.SEMessageDispatcher.prototype.sendObjectToAgent = function (obj)
 {
    var result = shetab.ebook.common.SEMessage.c_undefined;
    for (var i = 0; i < this._iframes.length && result === shetab.ebook.common.SEMessage.c_undefined; i++)
    {
        try
        {
            var dataFunc = this._iframes[i]["shetabEbookSendDataToAgent"];
            if (shetab.common.Utility.isUndefined(dataFunc))
            {
                this._iframes.splice(i, 1);
                i--;
                continue;
            }
            if (shetab.common.Utility.isTypeOf(obj,  String))
            {
                result = dataFunc(obj);
            }
            else
            {
                var messageFunc = this._iframes[i]["shetabEbookSendMessageToAgent"];
                result = shetab.common.Utility.isDefined(messageFunc) ? messageFunc(obj) : dataFunc(obj.toXml());
            }
        }
        catch (e)
        {
            console.error(e.stack);
        }
    }
    return result;
};
shetab.ebook.agent.SEMessageDispatcher.prototype.sendDataToAgent = function (value)
 {
    return this.sendObjectToAgent(value);
};
shetab.ebook.agent.SEMessageDispatcher.prototype.sendMessageToAgent = function (value)
 {
    return this.sendObjectToAgent(value);
};
shetab.ebook.agent.SEMessageDispatcher.getAllObjects = function (testPropertyName)
 {
    var flashObject =  [];
    var objects = document.getElementsByTagName("object");
    for (var i = 0; i < objects.length; i++)
    {
        var obj = objects[i]instanceof HTMLElement || objects[i] == null ? objects[i] : (function ()
        {
            throw new Error("InvalidCastException");
        }());
        if (obj.hasOwnProperty(testPropertyName) !== undefined)
        {
            if (obj.getElementsByTagName("embed").length === 0)
                flashObject.push(obj);
        }
    }
    var embeds = document.getElementsByTagName("embed");
    for (var i = 0; i < embeds.length; i++)
    {
        var obj = objects[i]instanceof HTMLElement || objects[i] == null ? objects[i] : (function ()

        {
            throw new Error("InvalidCastException");
        }());
        if (obj.hasOwnProperty(testPropertyName) !== undefined)
        {
            if (obj.getElementsByTagName("embed").length === 0)
                flashObject.push(obj);
        }
    }
    return flashObject;
};
shetab.ebook.agent.SEUtility = function ()
 {
};
shetab.ebook.agent.SEUtility.getPlaceholderIdFromElementId = function (elementId)
 {
    var index = elementId.indexOf("placeholder_");
    return index !== -1 ? elementId.substr(index + "placeholder_".length) : null;
};
function shetabEbookSendMessageToAgent(message)
 {
    if (shetab.ebook.agent.SEApp.get_current() !== null)
        return shetab.ebook.agent.SEApp.get_current().sendMessageToAgent(message);
    return shetab.ebook.common.SEMessage.c_undefined;
};
function shetabEbookSendDataToAgent(data)
 {
    if (shetab.ebook.agent.SEApp.get_current() !== null)
        return shetab.ebook.agent.SEApp.get_current().sendDataToAgent(data);
    return shetab.ebook.common.SEMessage.c_undefined;
};
function shetabEbookSendMessageToEngine(message)
 {
    return shetabEbookSendDataToEngine(message.toXml());
};
function shetabEbookSendDataToEngine(data)
 {
    console.log(data);
    return shetab.ebook.common.SEMessage.c_undefined;
};
var agentVersion = "5.0.8";
var seApp = null;
if ( typeof(seCreatorApp)=='undefined')
    shetab.ebook.agent.SEApp.create();
if (typeof(shetab) == "undefined")
    var shetab = {};
if (typeof(shetab.ebook) == "undefined")
    shetab.ebook = {};
if (typeof(shetab.ebook.agent) == "undefined")
    shetab.ebook.agent = {};
if (typeof(shetab.ebook.agent.api) == "undefined")
    shetab.ebook.agent.api = {};
shetab.ebook.agent.api.SECreatorCore = function ()
{
    shetab.ebook.agent.SEApp.call(this);
};
shetab.ebook.agent.api.SECreatorCore.prototype.get_typeName = function ()
{
    return "CreatorCore";
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "typeName", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_typeName, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.removeTopicLink = function ()
{
    this.invokeExecuteCommand("removeTopicLink");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showNewProjectWindow = function ()
{
    this.invokeExecuteCommand("showNewProjectWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showBuildMediaWindow = function ()
{
    this.invokeExecuteCommand("showBuildMediaWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showBuildIndexWindow = function ()
{
    this.invokeExecuteCommand("showBuildIndexWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showOpenProjectWindow = function ()
{
    this.invokeExecuteCommand("showOpenProjectWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showRecursivePropertiesWindow = function ()
{
    this.invokeExecuteCommand("showRecursivePropertiesWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showProjectPropertiesWindow = function ()
{
    this.invokeExecuteCommand("showProjectPropertiesWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showAddNewBookWindow = function ()
{
    this.invokeExecuteCommand("showAddNewBookWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showAddExistingBookWindow = function ()
{
    this.invokeExecuteCommand("showAddExistingBookWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showProjectExplorer = function ()
{
    this.invokeExecuteCommand("showProjectExplorer");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showAboutShetabEbookCreatorWindow = function ()
{
    this.invokeExecuteCommand("showAboutShetabEbookCreatorWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showSortChildrenWindow = function ()
{
    this.invokeExecuteCommand("showSortChildrenWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showSortChildrenDescendingWindow = function ()
{
    this.invokeExecuteCommand("showSortChildrenDescendingWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showShiftPageNumberWindow = function ()
{
    this.invokeExecuteCommand("showShiftPageNumberWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showCommandBuilderWindow = function ()
{
    this.invokeExecuteCommand("showCommandBuilderWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.toggleCommonTaskPaneVisible = function ()
{
    this.invokeExecuteCommand("toggleCommonTaskPaneVisible");
};
shetab.ebook.agent.api.SECreatorCore.prototype.openShetabEbookCreatorHelp = function ()
{
    this.invokeExecuteCommand("openShetabEbookCreatorHelp");
};
shetab.ebook.agent.api.SECreatorCore.prototype.saveProject = function ()
{
    this.invokeExecuteCommand("saveProject");
};
shetab.ebook.agent.api.SECreatorCore.prototype.closeProject = function ()
{
    this.invokeExecuteCommand("closeProject");
};
shetab.ebook.agent.api.SECreatorCore.prototype.locateFile = function ()
{
    this.invokeExecuteCommand("locateFile");
};
shetab.ebook.agent.api.SECreatorCore.prototype.editFile = function ()
{
    this.invokeExecuteCommand("editFile");
};
shetab.ebook.agent.api.SECreatorCore.prototype.newTopic = function ()
{
    this.invokeExecuteCommand("newTopic");
};
shetab.ebook.agent.api.SECreatorCore.prototype.newTopicFromFile = function ()
{
    this.invokeExecuteCommand("newTopicFromFile");
};
shetab.ebook.agent.api.SECreatorCore.prototype.newTopicFromCurrentPage = function ()
{
    this.invokeExecuteCommand("newTopicFromCurrentPage");
};
shetab.ebook.agent.api.SECreatorCore.prototype.newSubTopic = function ()
{
    this.invokeExecuteCommand("newSubTopic");
};
shetab.ebook.agent.api.SECreatorCore.prototype.newSubTopicFromFile = function ()
{
    this.invokeExecuteCommand("newSubTopicFromFile");
};
shetab.ebook.agent.api.SECreatorCore.prototype.newSubTopicFromBook = function ()
{
    this.invokeExecuteCommand("newSubTopicFromBook");
};
shetab.ebook.agent.api.SECreatorCore.prototype.newSubTopicFromFolder = function ()
{
    this.invokeExecuteCommand("newSubTopicFromFolder");
};
shetab.ebook.agent.api.SECreatorCore.prototype.newSubTopicFromCurrentPage = function ()
{
    this.invokeExecuteCommand("newSubTopicFromCurrentPage");
};
shetab.ebook.agent.api.SECreatorCore.prototype.reloadBook = function ()
{
    this.invokeExecuteCommand("reloadBook");
};
shetab.ebook.agent.api.SECreatorCore.prototype.runProject = function ()
{
    this.invokeExecuteCommand("runProject");
};
shetab.ebook.agent.api.SECreatorCore.prototype.navigateStartPage = function ()
{
    this.invokeExecuteCommand("navigateStartPage");
};
shetab.ebook.agent.api.SECreatorCore.prototype.openProjectFolder = function ()
{
    this.invokeExecuteCommand("openProjectFolder");
};
shetab.ebook.agent.api.SECreatorCore.prototype.openMediaFolder = function ()
{
    this.invokeExecuteCommand("openMediaFolder");
};
shetab.ebook.agent.api.SECreatorCore.prototype.sortChildren = function ()
{
    this.invokeExecuteCommand("sortChildren");
};
shetab.ebook.agent.api.SECreatorCore.prototype.sortChildrenRecursive = function ()
{
    this.invokeExecuteCommand("sortChildrenRecursive");
};
shetab.ebook.agent.api.SECreatorCore.prototype.sortChildrenDescending = function ()
{
    this.invokeExecuteCommand("sortChildrenDescending");
};
shetab.ebook.agent.api.SECreatorCore.prototype.sortChildrenDescendingRecursive = function ()
{
    this.invokeExecuteCommand("sortChildrenDescendingRecursive");
};
shetab.ebook.agent.api.SECreatorCore.prototype.setPageTitleFromSelection = function ()
{
    this.invokeExecuteCommand("setPageTitleFromSelection");
};
shetab.ebook.agent.api.SECreatorCore.prototype.setHomePageFromSelection = function ()
{
    this.invokeExecuteCommand("setHomePageFromSelection");
};
shetab.ebook.agent.api.SECreatorCore.prototype.startShetabQuizCreator = function ()
{
    this.invokeExecuteCommand("startShetabQuizCreator");
};
shetab.ebook.agent.api.SECreatorCore.prototype.startShetabSkinCreator = function ()
{
    this.invokeExecuteCommand("startShetabSkinCreator");
};
shetab.ebook.agent.api.SECreatorCore.prototype.addFile = function ()
{
    this.invokeExecuteCommand("addFile");
};
shetab.ebook.agent.api.SECreatorCore.prototype.addFolder = function ()
{
    this.invokeExecuteCommand("addFolder");
};
shetab.ebook.agent.api.SECreatorCore.prototype.setRootContentsBook = function ()
{
    this.invokeExecuteCommand("setRootContentsBook");
};
shetab.ebook.agent.api.SECreatorCore.prototype.buildMedia = function ()
{
    this.invokeExecuteCommand("buildMedia");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showAdvancedPropertiesWindow = function ()
{
    this.invokeExecuteCommand("showAdvancedPropertiesWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showAdvancedPropertiesWindowRecursive = function ()
{
    this.invokeExecuteCommand("showAdvancedPropertiesWindowRecursive");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showEffectsPropertiesWindow = function ()
{
    this.invokeExecuteCommand("showEffectsPropertiesWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showEffectsPropertiesWindowRecursive = function ()
{
    this.invokeExecuteCommand("showEffectsPropertiesWindowRecursive");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showSoundPropertiesWindow = function ()
{
    this.invokeExecuteCommand("showSoundPropertiesWindow");
};
shetab.ebook.agent.api.SECreatorCore.prototype.showSoundPropertiesWindowRecursive = function ()
{
    this.invokeExecuteCommand("showSoundPropertiesWindowRecursive");
};
shetab.ebook.agent.api.SECreatorCore.prototype.repairProject = function ()
{
    this.invokeExecuteCommand("repairProject");
};
shetab.ebook.agent.api.SECreatorCore.prototype.copyToLastChild = function ()
{
    this.invokeExecuteCommand("copyToLastChild");
};
shetab.ebook.agent.api.SECreatorCore.prototype.copyToPreviousSibling = function ()
{
    this.invokeExecuteCommand("copyToPreviousSibling");
};
shetab.ebook.agent.api.SECreatorCore.prototype.copyToNextSibling = function ()
{
    this.invokeExecuteCommand("copyToNextSibling");
};
shetab.ebook.agent.api.SECreatorCore.prototype.moveToLastChild = function ()
{
    this.invokeExecuteCommand("moveToLastChild");
};
shetab.ebook.agent.api.SECreatorCore.prototype.cancel = function ()
{
    this.invokeExecuteCommand("cancel");
};
shetab.ebook.agent.api.SECreatorCore.prototype.get_localFontNames = function ()
{
    var ret = this.invokeGetProperty("localFontNames", "Arial#$$;Geneva#$$;Sans-Serif#$$;Tahoma#$$;Times New Roman#$$;Verdana");
    return ret !== null ? shetab.ebook.common.SEMessage.array_fromString(ret,  String) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "localFontNames", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_localFontNames, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_taskPanelVisible = function ()
{
    var ret = this.invokeGetProperty("taskPanelVisible", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECreatorCore.prototype.set_taskPanelVisible = function (value)
{
    this.invokeSetProperty("taskPanelVisible", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "taskPanelVisible", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_taskPanelVisible, set: shetab.ebook.agent.api.SECreatorCore.prototype.set_taskPanelVisible, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_recentProjects = function ()
{
    return this.invokeGetProperty("recentProjects", "");
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "recentProjects", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_recentProjects, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_allCultures = function ()
{
    return this.invokeGetProperty("allCultures", "");
};
shetab.ebook.agent.api.SECreatorCore.prototype.set_allCultures = function (value)
{
    this.invokeSetProperty("allCultures", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "allCultures", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_allCultures, set: shetab.ebook.agent.api.SECreatorCore.prototype.set_allCultures, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_isTrialEdition = function ()
{
    var ret = this.invokeGetProperty("isTrialEdition", "true");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "isTrialEdition", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_isTrialEdition, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_autoSave = function ()
{
    var ret = this.invokeGetProperty("autoSave", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECreatorCore.prototype.set_autoSave = function (value)
{
    this.invokeSetProperty("autoSave", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "autoSave", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_autoSave, set: shetab.ebook.agent.api.SECreatorCore.prototype.set_autoSave, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_openLastProjectOnStartup = function ()
{
    var ret = this.invokeGetProperty("openLastProjectOnStartup", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.ebook.agent.api.SECreatorCore.prototype.set_openLastProjectOnStartup = function (value)
{
    this.invokeSetProperty("openLastProjectOnStartup", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "openLastProjectOnStartup", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_openLastProjectOnStartup, set: shetab.ebook.agent.api.SECreatorCore.prototype.set_openLastProjectOnStartup, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_workspaceFolder = function ()
{
    return this.invokeGetProperty("workspaceFolder", "c:\\Shetab eBook");
};
shetab.ebook.agent.api.SECreatorCore.prototype.set_workspaceFolder = function (value)
{
    this.invokeSetProperty("workspaceFolder", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "workspaceFolder", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_workspaceFolder, set: shetab.ebook.agent.api.SECreatorCore.prototype.set_workspaceFolder, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorLicenseeTokenId = function ()
{
    return this.invokeGetProperty("creatorLicenseeTokenId", "Test Token Id");
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "creatorLicenseeTokenId", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorLicenseeTokenId, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorLicenseeId = function ()
{
    return this.invokeGetProperty("creatorLicenseeId", "Test User Id");
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "creatorLicenseeId", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorLicenseeId, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorLicenseeName = function ()
{
    return this.invokeGetProperty("creatorLicenseeName", "Test User");
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "creatorLicenseeName", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorLicenseeName, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorLicenseeEdition = function ()
{
    return this.invokeGetProperty("creatorLicenseeEdition", "Test Edition");
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "creatorLicenseeEdition", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorLicenseeEdition, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorVersion = function ()
{
    return this.invokeGetProperty("creatorVersion", "0.0.0.0");
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "creatorVersion", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorVersion, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorDownloadPageUrl = function ()
{
    return this.invokeGetProperty("creatorDownloadPageUrl", "http://www.shetabtech.com");
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "creatorDownloadPageUrl", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorDownloadPageUrl, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorPadFileUrl = function ()
{
    return this.invokeGetProperty("creatorPadFileUrl", "http://www.shetabtech.com");
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "creatorPadFileUrl", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_creatorPadFileUrl, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.get_autoCheckUpdate = function ()
{
    return this.invokeGetProperty("autoCheckUpdate", "");
};
shetab.ebook.agent.api.SECreatorCore.prototype.set_autoCheckUpdate = function (value)
{
    this.invokeSetProperty("autoCheckUpdate", value);
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorCore.prototype, "autoCheckUpdate", {get: shetab.ebook.agent.api.SECreatorCore.prototype.get_autoCheckUpdate, set: shetab.ebook.agent.api.SECreatorCore.prototype.set_autoCheckUpdate, enumerable: true});
shetab.ebook.agent.api.SECreatorCore.prototype.getCreatorResource = function (resourceFile, resourceKey)
{
    var msg = (function ()
    {
        var $v1 = new shetab.ebook.common.SEMessage();
        $v1.methodName = "getCreatorResource";
        return $v1;
    }).call(this);
    if (shetab.common.Utility.isDefined(resourceFile))
        msg.setParam("resourceFile", resourceFile);
    if (shetab.common.Utility.isDefined(resourceKey))
        msg.setParam("resourceKey", resourceKey);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.openProject = function (file)
{
    var msg = (function ()
    {
        var $v2 = new shetab.ebook.common.SEMessage();
        $v2.methodName = "openProject";
        return $v2;
    }).call(this);
    if (shetab.common.Utility.isDefined(file))
        msg.setParam("file", file);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.getPromptNewProjectFolder = function (initFolder)
{
    var msg = (function ()
    {
        var $v3 = new shetab.ebook.common.SEMessage();
        $v3.methodName = "getPromptNewProjectFolder";
        return $v3;
    }).call(this);
    if (shetab.common.Utility.isDefined(initFolder))
        msg.setParam("initFolder", initFolder);
    msg.setParam("testValue", "@initFolder");
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.getDefaultNewProjectFolder = function (projectName)
{
    var msg = (function ()
    {
        var $v4 = new shetab.ebook.common.SEMessage();
        $v4.methodName = "getDefaultNewProjectFolder";
        return $v4;
    }).call(this);
    if (shetab.common.Utility.isDefined(projectName))
        msg.setParam("projectName", projectName);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.getPromptText = function (initText, title, multiline, cancelValue)
{
    var msg = (function ()
    {
        var $v5 = new shetab.ebook.common.SEMessage();
        $v5.methodName = "getPromptText";
        return $v5;
    }).call(this);
    if (shetab.common.Utility.isDefined(initText))
        msg.setParam("initText", initText);
    if (shetab.common.Utility.isDefined(title))
        msg.setParam("title", title);
    if (shetab.common.Utility.isDefined(multiline))
        msg.setParam("multiline", multiline);
    if (shetab.common.Utility.isDefined(cancelValue))
        msg.setParam("cancelValue", cancelValue);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.createAction = function (pluginId, bookId, targetFolder)
{
    var msg = (function ()
    {
        var $v6 = new shetab.ebook.common.SEMessage();
        $v6.methodName = "createAction";
        return $v6;
    }).call(this);
    if (shetab.common.Utility.isDefined(pluginId))
        msg.setParam("pluginId", pluginId);
    if (shetab.common.Utility.isDefined(bookId))
        msg.setParam("bookId", bookId);
    if (shetab.common.Utility.isDefined(targetFolder))
        msg.setParam("targetFolder", targetFolder);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.getActions = function (bookId)
{
    var msg = (function ()
    {
        var $v7 = new shetab.ebook.common.SEMessage();
        $v7.methodName = "getActions";
        return $v7;
    }).call(this);
    if (shetab.common.Utility.isDefined(bookId))
        msg.setParam("bookId", bookId);
    return this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.createProject = function (param)
{
    var msg = (function ()
    {
        var $v8 = new shetab.ebook.common.SEMessage();
        $v8.methodName = "createProject";
        return $v8;
    }).call(this);
    if (shetab.common.Utility.isDefined(param))
        msg.setParam("param", param);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.setTopicLink = function (topicId, link)
{
    var msg = (function ()
    {
        var $v9 = new shetab.ebook.common.SEMessage();
        $v9.methodName = "setTopicLink";
        return $v9;
    }).call(this);
    if (shetab.common.Utility.isDefined(topicId))
        msg.setParam("topicId", topicId);
    if (shetab.common.Utility.isDefined(link))
        msg.setParam("link", link);
    this.invoke(msg);
};
shetab.ebook.agent.api.SECreatorCore.prototype.getAllCommandNames = function ()
{
    var ret = shetab.ebook.agent.api.SECore.prototype.getAllCommandNames.call(this);
    ret.push("removeTopicLink");
    ret.push("showNewProjectWindow");
    ret.push("showBuildMediaWindow");
    ret.push("showBuildIndexWindow");
    ret.push("showOpenProjectWindow");
    ret.push("showRecursivePropertiesWindow");
    ret.push("showProjectPropertiesWindow");
    ret.push("showAddNewBookWindow");
    ret.push("showAddExistingBookWindow");
    ret.push("showProjectExplorer");
    ret.push("showAboutShetabEbookCreatorWindow");
    ret.push("showSortChildrenWindow");
    ret.push("showSortChildrenDescendingWindow");
    ret.push("showShiftPageNumberWindow");
    ret.push("showCommandBuilderWindow");
    ret.push("toggleCommonTaskPaneVisible");
    ret.push("openShetabEbookCreatorHelp");
    ret.push("saveProject");
    ret.push("closeProject");
    ret.push("locateFile");
    ret.push("editFile");
    ret.push("newTopic");
    ret.push("newTopicFromFile");
    ret.push("newTopicFromCurrentPage");
    ret.push("newSubTopic");
    ret.push("newSubTopicFromFile");
    ret.push("newSubTopicFromBook");
    ret.push("newSubTopicFromFolder");
    ret.push("newSubTopicFromCurrentPage");
    ret.push("reloadBook");
    ret.push("runProject");
    ret.push("navigateStartPage");
    ret.push("openProjectFolder");
    ret.push("openMediaFolder");
    ret.push("sortChildren");
    ret.push("sortChildrenRecursive");
    ret.push("sortChildrenDescending");
    ret.push("sortChildrenDescendingRecursive");
    ret.push("setPageTitleFromSelection");
    ret.push("setHomePageFromSelection");
    ret.push("startShetabQuizCreator");
    ret.push("startShetabSkinCreator");
    ret.push("addFile");
    ret.push("addFolder");
    ret.push("setRootContentsBook");
    ret.push("buildMedia");
    ret.push("showAdvancedPropertiesWindow");
    ret.push("showAdvancedPropertiesWindowRecursive");
    ret.push("showEffectsPropertiesWindow");
    ret.push("showEffectsPropertiesWindowRecursive");
    ret.push("showSoundPropertiesWindow");
    ret.push("showSoundPropertiesWindowRecursive");
    ret.push("repairProject");
    ret.push("copyToLastChild");
    ret.push("copyToPreviousSibling");
    ret.push("copyToNextSibling");
    ret.push("moveToLastChild");
    ret.push("cancel");
    return ret;
};
$Inherit(shetab.ebook.agent.api.SECreatorCore, shetab.ebook.agent.SEApp);
shetab.ebook.agent.api.SECreatorAgentApi = function (message)
{
    this._message = null;
    this._creatorAgent = null;
    this.set_message(message);
    this.set_creatorAgent(shetab.ebook.agent.SECreatorApp.get_current().creatorAgent);
};
shetab.ebook.agent.api.SECreatorAgentApi.prototype.get_message = function ()
{
    return this._message;
};
shetab.ebook.agent.api.SECreatorAgentApi.prototype.set_message = function (value)
{
    this._message = value;
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorAgentApi.prototype, "message", {get: shetab.ebook.agent.api.SECreatorAgentApi.prototype.get_message, set: shetab.ebook.agent.api.SECreatorAgentApi.prototype.set_message, enumerable: true});
shetab.ebook.agent.api.SECreatorAgentApi.prototype.get_creatorAgent = function ()
{
    return this._creatorAgent;
};
shetab.ebook.agent.api.SECreatorAgentApi.prototype.set_creatorAgent = function (value)
{
    this._creatorAgent = value;
};
Object.defineProperty(shetab.ebook.agent.api.SECreatorAgentApi.prototype, "creatorAgent", {get: shetab.ebook.agent.api.SECreatorAgentApi.prototype.get_creatorAgent, set: shetab.ebook.agent.api.SECreatorAgentApi.prototype.set_creatorAgent, enumerable: true});
shetab.ebook.agent.SECreatorApp = function ()
{
    this.creatorAgent = new shetab.ebook.agent.SECreatorApp.SECreatorAgent();
    this.fireProjectChanged = null;
    shetab.ebook.agent.api.SECreatorCore.call(this);
    seCreatorApp = this;
};
shetab.ebook.agent.SECreatorApp.create = function ()
{
    shetab.ebook.agent.SEApp.currentField = new shetab.ebook.agent.SECreatorApp();
};
shetab.ebook.agent.SECreatorApp.prototype.add_fireProjectChanged = function (value)
{
    this.fireProjectChanged = $CombineDelegates(this.fireProjectChanged, value);
};
shetab.ebook.agent.SECreatorApp.prototype.remove_fireProjectChanged = function (value)
{
    this.fireProjectChanged = $RemoveDelegate(this.fireProjectChanged, value);
};
shetab.ebook.agent.SECreatorApp.get_current = function ()
{
    if (shetab.ebook.agent.SEApp.currentField === null)
        shetab.ebook.agent.SEApp.currentField = new shetab.ebook.agent.SECreatorApp();
    return Cast(shetab.ebook.agent.SEApp.get_current(), shetab.ebook.agent.SECreatorApp);
};
Object.defineProperty(shetab.ebook.agent.SECreatorApp, "current", {get: shetab.ebook.agent.SECreatorApp.get_current, enumerable: true});
$Inherit(shetab.ebook.agent.SECreatorApp, shetab.ebook.agent.api.SECreatorCore);
if (typeof(shetab.ebook.agent.SECreatorApp) == "undefined")
    shetab.ebook.agent.SECreatorApp = {};
shetab.ebook.agent.SECreatorApp.SECreatorAgent = function ()
{
};
shetab.ebook.agent.SECreatorApp.SECreatorAgent.prototype.fireProjectChanged = function ()
{
    if (shetab.ebook.agent.SECreatorApp.get_current().fireProjectChanged !== null)
        this.fireProjectChanged();
};
shetab.ebook.agent.api.SECreatorMessageParser = function ()
{
    shetab.ebook.agent.api.SEMessageParser.call(this);
};
shetab.ebook.agent.api.SECreatorMessageParser.prototype.getMessageForBase = function (message)
{
    if (message.typeName === "CreatorAgent")
        message.typeName = "Agent";
    return message;
};
shetab.ebook.agent.api.SECreatorMessageParser.prototype.processProperty = function (message, propertyName, propertyValue)
{
    var ret = shetab.ebook.agent.api.SECreatorMessageParser.doProcessProperty(message, propertyName, propertyValue);
    if (ret === shetab.ebook.common.SEMessage.c_unhandled)
        ret = shetab.ebook.agent.api.SEMessageParser.prototype.processProperty.call(this, this.getMessageForBase(message), propertyName, propertyValue);
    return ret;
};
shetab.ebook.agent.api.SECreatorMessageParser.prototype.processMethod = function (message)
{
    var ret = shetab.ebook.agent.api.SECreatorMessageParser.doProcessMethod(message);
    if (ret === shetab.ebook.common.SEMessage.c_unhandled)
        ret = shetab.ebook.agent.api.SEMessageParser.prototype.processMethod.call(this, this.getMessageForBase(message));
    return ret;
};
shetab.ebook.agent.api.SECreatorMessageParser.doProcessProperty = function (message, propertyName, propertyValue)
{
    var isGet = propertyValue === null;
    var api = new shetab.ebook.agent.api.SECreatorAgentApi(message);
    if (message.typeName === "CreatorAgent")
    {
    }
    return shetab.ebook.common.SEMessage.c_unhandled;
};
shetab.ebook.agent.api.SECreatorMessageParser.doProcessMethod = function (message)
{
    var api = new shetab.ebook.agent.api.SECreatorAgentApi(message);
    if (message.typeName === "CreatorAgent")
    {
        if (message.methodName === "fireProjectChanged")
        {
            api.creatorAgent.fireProjectChanged();
            return shetab.ebook.common.SEMessage.c_undefined;
        }
    }
    return shetab.ebook.common.SEMessage.c_unhandled;
};
$Inherit(shetab.ebook.agent.api.SECreatorMessageParser, shetab.ebook.agent.api.SEMessageParser);
shetab.ebook.agent.SECreatorApp.create();
