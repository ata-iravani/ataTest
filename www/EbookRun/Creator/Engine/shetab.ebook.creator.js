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
shetab.SEModuleBase = function ()
 {
    this._fileUrl = null;
    this._previewUrl = null;
    this._iconUrl = null;
    this._resourcesUrl = null;
    this._type = shetab.SEModuleBase.Type.typical;
    this._id = null;
    this._title = null;
    this._category = null;
    this._description = null;
    this._placeholderId = null;
    this._playerFileTypes = null;
    this._visible = null;
    this._propertyBagSchema = null;
    this._resourceManager = null;
    this._url = null;
    this.set_visible(true);
    this.set_propertyBagSchema(new shetab.SEPropertyBagSchema());
    this.set_resourceManager(new shetab.SEResourceManager());
};
shetab.SEModuleBase.prototype.get_type = function ()
 {
    return this._type;
};
shetab.SEModuleBase.prototype.set_type = function (value)
 {
    this._type = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "type", {get: shetab.SEModuleBase.prototype.get_type, set: shetab.SEModuleBase.prototype.set_type, enumerable: true});
shetab.SEModuleBase.prototype.get_id = function ()
 {
    return this._id;
};
shetab.SEModuleBase.prototype.set_id = function (value)
 {
    this._id = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "id", {get: shetab.SEModuleBase.prototype.get_id, set: shetab.SEModuleBase.prototype.set_id, enumerable: true});
shetab.SEModuleBase.prototype.get_title = function ()
 {
    return this._title;
};
shetab.SEModuleBase.prototype.set_title = function (value)
 {
    this._title = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "title", {get: shetab.SEModuleBase.prototype.get_title, set: shetab.SEModuleBase.prototype.set_title, enumerable: true});
shetab.SEModuleBase.prototype.get_category = function ()
 {
    return this._category;
};
shetab.SEModuleBase.prototype.set_category = function (value)
 {
    this._category = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "category", {get: shetab.SEModuleBase.prototype.get_category, set: shetab.SEModuleBase.prototype.set_category, enumerable: true});
shetab.SEModuleBase.prototype.get_description = function ()
 {
    return this._description;
};
shetab.SEModuleBase.prototype.set_description = function (value)
 {
    this._description = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "description", {get: shetab.SEModuleBase.prototype.get_description, set: shetab.SEModuleBase.prototype.set_description, enumerable: true});
shetab.SEModuleBase.prototype.get_placeholderId = function ()
 {
    return this._placeholderId;
};
shetab.SEModuleBase.prototype.set_placeholderId = function (value)
 {
    this._placeholderId = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "placeholderId", {get: shetab.SEModuleBase.prototype.get_placeholderId, set: shetab.SEModuleBase.prototype.set_placeholderId, enumerable: true});
shetab.SEModuleBase.prototype.get_playerFileTypes = function ()
 {
    return this._playerFileTypes;
};
shetab.SEModuleBase.prototype.set_playerFileTypes = function (value)
 {
    this._playerFileTypes = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "playerFileTypes", {get: shetab.SEModuleBase.prototype.get_playerFileTypes, set: shetab.SEModuleBase.prototype.set_playerFileTypes, enumerable: true});
shetab.SEModuleBase.prototype.get_visible = function ()
 {
    return this._visible;
};
shetab.SEModuleBase.prototype.set_visible = function (value)
 {
    this._visible = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "visible", {get: shetab.SEModuleBase.prototype.get_visible, set: shetab.SEModuleBase.prototype.set_visible, enumerable: true});
shetab.SEModuleBase.prototype.get_propertyBagSchema = function ()
 {
    return this._propertyBagSchema;
};
shetab.SEModuleBase.prototype.set_propertyBagSchema = function (value)
 {
    this._propertyBagSchema = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "propertyBagSchema", {get: shetab.SEModuleBase.prototype.get_propertyBagSchema, set: shetab.SEModuleBase.prototype.set_propertyBagSchema, enumerable: true});
shetab.SEModuleBase.prototype.get_resourceManager = function ()
 {
    return this._resourceManager;
};
shetab.SEModuleBase.prototype.set_resourceManager = function (value)
 {
    this._resourceManager = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "resourceManager", {get: shetab.SEModuleBase.prototype.get_resourceManager, set: shetab.SEModuleBase.prototype.set_resourceManager, enumerable: true});
shetab.SEModuleBase.prototype.get_url = function ()
 {
    return this._url;
};
shetab.SEModuleBase.prototype.set_url = function (value)
 {
    this._url = value;
};
Object.defineProperty(shetab.SEModuleBase.prototype, "url", {get: shetab.SEModuleBase.prototype.get_url, set: shetab.SEModuleBase.prototype.set_url, enumerable: true});
shetab.SEModuleBase.prototype.get_fileUrl = function ()
 {
    return this.getAbsoulteUrl(this._fileUrl);
};
Object.defineProperty(shetab.SEModuleBase.prototype, "fileUrl", {get: shetab.SEModuleBase.prototype.get_fileUrl, enumerable: true});
shetab.SEModuleBase.prototype.get_previewUrl = function ()
 {
    return this.getAbsoulteUrl(this._previewUrl);
};
Object.defineProperty(shetab.SEModuleBase.prototype, "previewUrl", {get: shetab.SEModuleBase.prototype.get_previewUrl, enumerable: true});
shetab.SEModuleBase.prototype.get_iconUrl = function ()
 {
    return this.getAbsoulteUrl(this._iconUrl);
};
Object.defineProperty(shetab.SEModuleBase.prototype, "iconUrl", {get: shetab.SEModuleBase.prototype.get_iconUrl, enumerable: true});
shetab.SEModuleBase.prototype.get_resourcesUrl = function ()
 {
    return this.getAbsoulteUrl(this._resourcesUrl);
};
Object.defineProperty(shetab.SEModuleBase.prototype, "resourcesUrl", {get: shetab.SEModuleBase.prototype.get_resourcesUrl, enumerable: true});
shetab.SEModuleBase.prototype.getAbsoulteUrl = function (urlParam)
 {
    if (urlParam === null || urlParam === "")
        return null;
    return shetab.common.Uri.isRelative(urlParam) ? shetab.common.Uri.combine(this.get_url(), urlParam) : urlParam;
};
shetab.SEModuleBase.prototype.localizeText = function (text)
 {
    return text;
};
shetab.SEModuleBase.prototype.load = function (moduleFileUrl, loadHandler)
 {
    shetab.SEUtility.loadFile(moduleFileUrl, $CreateAnonymousDelegate(this, function (httpRequest)
    {
        try
        {
            if (!shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status))


                throw $CreateException(new shetab.common.error.FileLoadError(moduleFileUrl), new Error());
            this.set_url(moduleFileUrl);
            shetab.common.serialization.Serializer.deserialize(this, httpRequest.responseXML.documentElement);
            if (this.get_resourcesUrl() === null)
            {
                loadHandler(true);
                return;
            }
            this.get_resourceManager().addResourcesFolder(this.get_resourcesUrl(), shetab.SEGlobal.moduleName_local, $CreateAnonymousDelegate(this, function (success)
            {
                if (!success)
                {
                    loadHandler(true);
                    return;
                }
                var xml = this.localizeText(shetab.common.serialization.Serializer.serializeToXml(this, "seModule"));
                shetab.common.serialization.Serializer.deserialize(this, shetab.common.Xml.loadXmlString(xml).documentElement);
                loadHandler(true);
            }));
        }
        catch ($$e1)
        {
            loadHandler(false);
        }
    }));
};
shetab.SEModuleBase.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("type");
    info.addString("id");
    info.addString("category");
    info.addString("description");
    info.addString("_fileUrl").set_attributeName("fileUrl");
    info.addString("_previewUrl").set_attributeName("previewUrl");
    info.addString("_iconUrl").set_attributeName("iconUrl");
    info.addString("_resourcesUrl").set_attributeName("resourcesUrl");
    info.addString("placeholderId");
    info.addString("playerFileTypes").valueConverter = new shetab.SEModuleBase.PlayerFileTypeConverter();
    info.addBoolean("visible");
    info.add("propertyBagSchema",  shetab.SEPropertyBagSchema);
};
if (typeof(shetab.SEModuleBase) == "undefined")
    shetab.SEModuleBase = {};
shetab.SEModuleBase.PlayerFileTypeConverter = function ()
 {
};
shetab.SEModuleBase.PlayerFileTypeConverter.prototype.convert = function (value, targetCtor, parameter)
 {
    return value !== null ? value.join(";") : null;
};
shetab.SEModuleBase.PlayerFileTypeConverter.prototype.convertBack = function (value, targetCtor, parameter)
 {
    var ret =  [];
    if (value !== null && value !== "")
        ret = value.split(";");
    for (var i = 0; i < ret.length; i++)
        ret[i] = ret[i].toLowerCase();
    return ret;
};
shetab.SEModuleBase.Type = {typical: 0, player: 1};
shetab.SEModuleEntityBase = function ()
 {
    this._moduleId = null;
    this._propertyBag = null;
    this._url = null;
    this._id = null;
    this.set_propertyBag(new shetab.SEPropertyBag());
};
shetab.SEModuleEntityBase.prototype.get_moduleId = function ()
 {
    return this._moduleId;
};
shetab.SEModuleEntityBase.prototype.set_moduleId = function (value)
 {
    this._moduleId = value;
};
Object.defineProperty(shetab.SEModuleEntityBase.prototype, "moduleId", {get: shetab.SEModuleEntityBase.prototype.get_moduleId, set: shetab.SEModuleEntityBase.prototype.set_moduleId, enumerable: true});
shetab.SEModuleEntityBase.prototype.get_propertyBag = function ()
 {
    return this._propertyBag;
};
shetab.SEModuleEntityBase.prototype.set_propertyBag = function (value)
 {
    this._propertyBag = value;
};
Object.defineProperty(shetab.SEModuleEntityBase.prototype, "propertyBag", {get: shetab.SEModuleEntityBase.prototype.get_propertyBag, set: shetab.SEModuleEntityBase.prototype.set_propertyBag, enumerable: true});
shetab.SEModuleEntityBase.prototype.get_url = function ()
 {
    return this._url;
};
shetab.SEModuleEntityBase.prototype.set_url = function (value)
 {
    this._url = value;
};
Object.defineProperty(shetab.SEModuleEntityBase.prototype, "url", {get: shetab.SEModuleEntityBase.prototype.get_url, set: shetab.SEModuleEntityBase.prototype.set_url, enumerable: true});
shetab.SEModuleEntityBase.prototype.get_id = function ()
 {
    return this._id;
};
shetab.SEModuleEntityBase.prototype.set_id = function (value)
 {
    this._id = value;
};
Object.defineProperty(shetab.SEModuleEntityBase.prototype, "id", {get: shetab.SEModuleEntityBase.prototype.get_id, set: shetab.SEModuleEntityBase.prototype.set_id, enumerable: true});
shetab.SEModuleEntityBase.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("moduleId");
    info.add("propertyBag",  shetab.SEPropertyBag);
};
shetab.SEModuleEntityBase.prototype.load = function (fileUrl, loadHandler)
 {
    shetab.SEUtility.loadFile(fileUrl, $CreateAnonymousDelegate(this, function (httpRequest)
    {
        try
        {
            if (!shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status))
            {
                throw $CreateException(new shetab.common.error.FileLoadError(fileUrl), new Error());
            }
            this.set_id(fileUrl);
            this.set_url(fileUrl);
            shetab.common.serialization.Serializer.deserialize(this, httpRequest.responseXML.documentElement);
            loadHandler(true);
        }
        catch ($$e2)
        {
            loadHandler(false);
        }
    }));
};
shetab.SEPropertyBag = function ()
 {
    this.propertySets = new Object();
    this._schema = null;
};
shetab.SEPropertyBag.c_mainPropertySetId = "main";
shetab.SEPropertyBag.c_mainItemId = "main";
shetab.SEPropertyBag.c_defaultValue = "$$default";
shetab.SEPropertyBag.c_resetValue = "$$reset";
shetab.SEPropertyBag.prototype.get_schema = function ()
 {
    return this._schema;
};
shetab.SEPropertyBag.prototype.set_schema = function (value)
 {
    this._schema = value;
};
Object.defineProperty(shetab.SEPropertyBag.prototype, "schema", {get: shetab.SEPropertyBag.prototype.get_schema, set: shetab.SEPropertyBag.prototype.set_schema, enumerable: true});
shetab.SEPropertyBag.prototype.getSerializationInfo = function (info, context)
 {
    info.addDictionary("propertySets",  shetab.SEPropertyBag.PropertySet, "propertySet", "id");
};
shetab.SEPropertyBag.prototype.checkRequest = function (itemId, propertySetId)
 {
    if (itemId.Value === null || itemId.Value === "")
        itemId.Value = shetab.SEPropertyBag.c_mainItemId;
    if (propertySetId.Value === null || propertySetId.Value === "")
        propertySetId.Value = shetab.SEPropertyBag.c_mainPropertySetId;
};
shetab.SEPropertyBag.prototype.getProperty = function (propertyName, itemId, propertySetId)
 {
    (function ()
    {
        itemId = {Value: itemId};
        propertySetId = {Value: propertySetId};
        var $res = this.checkRequest(itemId, propertySetId);
        itemId = itemId.Value;
        propertySetId = propertySetId.Value;
        return $res;
    }).call(this);
    var propSet = this.propertySets[propertySetId];
    if (!shetab.common.Utility.isDefined(propSet))
        return shetab.SEPropertyBag.formatValue(this.getInitValue(propertyName, propertySetId), propertyName, this.get_schema().propertySets[propertySetId]);
    var item = propSet.items[itemId];
    if (!shetab.common.Utility.isDefined(item))
        return shetab.SEPropertyBag.formatValue(this.getInitValue(propertyName, propertySetId), propertyName, this.get_schema().propertySets[propertySetId]);
    var value = item.properties[propertyName];
    value = shetab.common.Utility.isDefined(value) ? value : this.getInitValue(propertyName, propertySetId);
    return shetab.SEPropertyBag.formatValue(value, propertyName, this.get_schema().propertySets[propertySetId]);
};
shetab.SEPropertyBag.prototype.setProperty = function (propertyName, value, itemId, propertySetId)
 {
    (function ()
    {
        itemId = {Value: itemId};
        propertySetId = {Value: propertySetId};
        var $res = this.checkRequest(itemId, propertySetId);
        itemId = itemId.Value;
        propertySetId = propertySetId.Value;
        return $res;


    }).call(this);
    var propSet = this.propertySets[propertySetId];
    if (!shetab.common.Utility.isDefined(propSet))
        propSet = this.propertySets[propertySetId] = new shetab.SEPropertyBag.PropertySet();
    var item = propSet.items[itemId];
    if (!shetab.common.Utility.isDefined(item))
        item = propSet.items[itemId] = new shetab.SEPropertyBag.PropertySetItem();
    if (value === shetab.SEPropertyBag.c_resetValue)
        value = this.getInitValue(propertyName, propertySetId);
    var oldValue = item.properties[propertyName];
    item.properties[propertyName] = value;
    return oldValue !== value;
};
shetab.SEPropertyBag.prototype.getProperties = function (itemId, propertySetId)
 {
    (function ()
    {
        itemId = {Value: itemId};
        propertySetId = {Value: propertySetId};
        var $res = this.checkRequest(itemId, propertySetId);
        itemId = itemId.Value;
        propertySetId = propertySetId.Value;
        return $res;
    }).call(this);
    var ret = new Object();
    var propSet = this.propertySets[propertySetId];
    if (shetab.common.Utility.isDefined(propSet))
    {
        var item = propSet.items[itemId];
        if (shetab.common.Utility.isDefined(item))
        {
            for (var propertyName in item.properties)
                ret[propertyName] = this.getProperty(propertyName, itemId, propertySetId);
        }
    }
    var schemaPropertySet = this.get_schema().propertySets[propertySetId];
    if (shetab.common.Utility.isDefined(schemaPropertySet))
    {
        for (var propertyName in schemaPropertySet.properties)
        {
            if (!shetab.common.Utility.isDefined(ret[propertyName]))
                ret[propertyName] = this.getProperty(propertyName, itemId, propertySetId);
        }
    }
    return ret;
};
shetab.SEPropertyBag.prototype.getItems = function (propertySetId)
 {
    if (propertySetId === null || propertySetId === "")
        propertySetId = shetab.SEPropertyBag.c_mainPropertySetId;
    var propSet = this.propertySets[propertySetId];
    if (!shetab.common.Utility.isDefined(propSet))
        return null;
    var ret =  [];
    for (var itemId in propSet.items)
    {
        ret.push(itemId);
    }
    return ret;
};
shetab.SEPropertyBag.prototype.removeItem = function (itemId, propertySetId)
 {
    (function ()
    {
        itemId = {Value: itemId};
        propertySetId = {Value: propertySetId};
        var $res = this.checkRequest(itemId, propertySetId);
        itemId = itemId.Value;
        propertySetId = propertySetId.Value;
        return $res;
    }).call(this);
    var propSet = this.propertySets[propertySetId];
    if (!shetab.common.Utility.isDefined(propSet))
        return;
    delete propSet.items[itemId];
};
shetab.SEPropertyBag.formatValue = function (value, propertyName, propertySet)
 {
    var property = shetab.common.Utility.isDefined(propertySet) ? shetab.common.Utility.checkUndefined(propertySet.properties[propertyName], null) : null;
    var type = property !== null ? property.type : shetab.SEPropertyBagSchema.PropertyType.text;
    if (value !== null)
        value = shetab.common.StringHelper.trim(value);
    if (value === "" && type !== shetab.SEPropertyBagSchema.PropertyType.text)
        value = null;
    if (value === null && property !== null && !property.canNull)
    {
        value = property.initValue;
        if (value !== null)
            value = shetab.common.StringHelper.trim(value);
        if (value === null || value === "")
        {
            switch (type)
            {
                case shetab.SEPropertyBagSchema.PropertyType.text:
                    value = "";
                    break;
                case shetab.SEPropertyBagSchema.PropertyType.number:
                    value = "0";
                    break;
                case shetab.SEPropertyBagSchema.PropertyType.boolean:
                    value = "false";
                    break;
                case shetab.SEPropertyBagSchema.PropertyType.color:
                    value = "rgb(0,0,0)";
                    break;
            }
        }
    }
    return (type + "," + value !== null ? type + "," + value : shetab.SEMessage.c_null);
};
shetab.SEPropertyBag.prototype.getInitValue = function (propertyName, propertySetId)
 {
    var propertySet = this.get_schema().propertySets[propertySetId];
    if (!shetab.common.Utility.isDefined(propertySet))
        return null;
    var property = propertySet.properties[propertyName];
    return shetab.common.Utility.isDefined(property) ? property.initValue : null;
};
shetab.SEPropertyBag.prototype.resetProperty = function (propertyName, itemId, propertySetId)
 {
    return this.setProperty(propertyName, shetab.SEPropertyBag.c_resetValue, itemId, propertySetId);
};
shetab.SEPropertyBag.prototype.resetAllProperties = function (itemId, propertySetId)
 {
    (function ()
    {
        itemId = {Value: itemId};
        propertySetId = {Value: propertySetId};
        var $res = this.checkRequest(itemId, propertySetId);
        itemId = itemId.Value;
        propertySetId = propertySetId.Value;
        return $res;
    }).call(this);
    var schemaPropertySet = this.get_schema().propertySets[propertySetId];
    if (!shetab.common.Utility.isDefined(schemaPropertySet))
        throw new Error("Could not find propertySetId in this PropertyBag. propertySetId: " + propertySetId);
    var ret = false;
    for (var propertyName in schemaPropertySet.properties)
        ret |= this.resetProperty(propertyName, itemId, propertySetId);
    return ret;
};
if (typeof(shetab.SEPropertyBag) == "undefined")
    shetab.SEPropertyBag = {};
shetab.SEPropertyBag.PropertySetItem = function ()
 {
    this.properties = new Object();
};
shetab.SEPropertyBag.PropertySetItem.prototype.getSerializationInfo = function (info, context)
 {
    info.addDictionary("properties",  String, "property", "name");
};
shetab.SEPropertyBag.PropertySet = function ()
 {
    this.items = new Object();
};
shetab.SEPropertyBag.PropertySet.prototype.getSerializationInfo = function (info, context)
 {
    info.addDictionary("items",  shetab.SEPropertyBag.PropertySetItem, "item", "id");
};
shetab.SEPropertyBagSchema = function ()
 {
    this.propertySets = new Object();
};
shetab.SEPropertyBagSchema.prototype.getSerializationInfo = function (info, context)
 {
    info.addDictionary("propertySets",  shetab.SEPropertyBagSchema.PropertySet, "propertySet", "id");
};
shetab.SEPropertyBagSchema.prototype.serialize = function (element, context)
 {
    shetab.common.serialization.Serializer.serialize(this, element, context, true);
};
shetab.SEPropertyBagSchema.prototype.deserialize = function (element, context)
 {
    shetab.common.serialization.Serializer.deserialize(this, element, context, true);
    for (var propertySetId in this.propertySets)
    {
        var propertySet = this.propertySets[propertySetId];
        if (propertySet.get_title() === null || propertySet.get_title() === "")
            propertySet.set_title(propertySetId);
    }
};
if (typeof(shetab.SEPropertyBagSchema) == "undefined")
    shetab.SEPropertyBagSchema = {};
shetab.SEPropertyBagSchema.PropertySet = function ()
 {
    this.properties = new Object();
    this._title = null;
};
shetab.SEPropertyBagSchema.PropertySet.prototype.get_title = function ()
 {
    return this._title;
};
shetab.SEPropertyBagSchema.PropertySet.prototype.set_title = function (value)
 {
    this._title = value;
};
Object.defineProperty(shetab.SEPropertyBagSchema.PropertySet.prototype, "title", {get: shetab.SEPropertyBagSchema.PropertySet.prototype.get_title, set: shetab.SEPropertyBagSchema.PropertySet.prototype.set_title, enumerable: true});
shetab.SEPropertyBagSchema.PropertySet.prototype.getSerializationInfo = function (info, context)
 {


    info.addDictionary("properties",  shetab.SEPropertyBagSchema.Property, "property", "name");
    info.addString("title");
};
shetab.SEPropertyBagSchema.PropertySet.prototype.clone = function ()
 {
    return shetab.common.serialization.Serializer.serializeClone(this,  shetab.SEPropertyBagSchema.PropertySet);
};
shetab.SEPropertyBagSchema.PropertySet.prototype.serialize = function (element, context)
 {
    shetab.common.serialization.Serializer.serialize(this, element, context, true);
};
shetab.SEPropertyBagSchema.PropertySet.prototype.deserialize = function (element, context)
 {
    shetab.common.serialization.Serializer.deserialize(this, element, context, true);
    for (var propertyName in this.properties)
    {
        var property = this.properties[propertyName];
        if (property.title === null || property.title === "")
            property.title = propertyName;
        if (property.category === null || property.category === "")
            property.category = "@(Creator:general,GeneralSection)";
    }
};
shetab.SEPropertyBagSchema.PropertyType = {text: "text", number: "number", boolean: "boolean", color: "color", font: "font", file: "file"};
shetab.SEPropertyBagSchema.PropertyListItem = function ()
 {
    this.title = null;
    this.imageUrl = null;
    this.value = null;
};
shetab.SEPropertyBagSchema.PropertyListItem.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("title");
    info.addString("imageUrl");
    info.addString("value").set_attributeName(null);
};
shetab.SEPropertyBagSchema.PropertyListItem.prototype.serialize = function (element, context)
 {
    shetab.common.serialization.Serializer.serialize(this, element, context, true);
};
shetab.SEPropertyBagSchema.PropertyListItem.prototype.deserialize = function (element, context)
 {
    shetab.common.serialization.Serializer.deserialize(this, element, context, true);
    if (this.title === null || this.title === "")
        this.title = this.value;
};
shetab.SEPropertyBagSchema.Property = function ()
 {
    this.title = null;
    this.category = null;
    this.type = shetab.SEPropertyBagSchema.PropertyType.text;
    this.canMultiSelect = true;
    this.canCustom = true;
    this.canNull = false;
    this.canDefault = false;
    this.readonly = false;
    this.visible = true;
    this.fileFilter = null;
    this.initValue = null;
    this.listItems =  [];
};
shetab.SEPropertyBagSchema.Property.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("title");
    info.addString("category");
    info.addString("type");
    info.addBoolean("canMultiSelect");
    info.addBoolean("canCustom");
    info.addBoolean("canNull");
    info.addBoolean("readonly");
    info.addBoolean("visible");
    info.addString("fileFilter");
    info.addString("initValue", true);
    info.addArray("listItems",  shetab.SEPropertyBagSchema.PropertyListItem, "listItem");
};
shetab.SEPropertyBagSchema.Property.prototype.clone = function ()
 {
    return shetab.common.serialization.Serializer.serializeClone(this,  shetab.SEPropertyBagSchema.Property);
};
shetab.SEResourceManager = function ()
 {
    this._defaultCulture = null;
    this._resourceManagers = null;
    this.set_resourceManagers(new Object());
    this.set_defaultCulture("en-US");
};
shetab.SEResourceManager.prototype.get_defaultCulture = function ()
 {
    return this._defaultCulture;
};
shetab.SEResourceManager.prototype.set_defaultCulture = function (value)
 {
    this._defaultCulture = value;
};
Object.defineProperty(shetab.SEResourceManager.prototype, "defaultCulture", {get: shetab.SEResourceManager.prototype.get_defaultCulture, set: shetab.SEResourceManager.prototype.set_defaultCulture, enumerable: true});
shetab.SEResourceManager.prototype.get_resourceManagers = function ()
 {
    return this._resourceManagers;
};
shetab.SEResourceManager.prototype.set_resourceManagers = function (value)
 {
    this._resourceManagers = value;
};
Object.defineProperty(shetab.SEResourceManager.prototype, "resourceManagers", {get: shetab.SEResourceManager.prototype.get_resourceManagers, set: shetab.SEResourceManager.prototype.set_resourceManagers, enumerable: true});
shetab.SEResourceManager.prototype.addResourcesFolder = function (resourcesFolderUrl, module, loadHandler)
 {
    shetab.SEUtility.loadFile(resourcesFolderUrl, $CreateAnonymousDelegate(this, function (httpRequest)
    {
        if (!shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status))
        {
            loadHandler(false);
            return;
        }
        var folderInfo = new shetab.SEFolderInfo();
        shetab.common.serialization.Serializer.deserialize(folderInfo, httpRequest.responseXML.documentElement);
        var wait = new shetab.SEWait(folderInfo.get_folders().length);
        for (var $i2 = 0, $t2 = folderInfo.get_folders(), $l2 = $t2.length, folder = $t2[$i2]; $i2 < $l2; $i2++, folder = $t2[$i2])
        {
            var resourceFolderUrl = shetab.common.Uri.combine(resourcesFolderUrl, shetab.common.Uri.combine(folder, "folderInfo.xml"));
            this.addResourceFolder(resourceFolderUrl, new shetab.common.CultureInfo(folder).get_name(), module, $CreateAnonymousDelegate(this, function (result)
            {
                wait.release();
            }));
        }
        wait.waitAll($CreateAnonymousDelegate(this, function ()
        {
            loadHandler(true);
        }));
    }));
};
shetab.SEResourceManager.prototype.addResourceFolder = function (folderInfoUrl, culture, module, loadHandler)
 {
    shetab.SEUtility.loadFile(folderInfoUrl, $CreateAnonymousDelegate(this, function (httpRequest)
    {
        if (!shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status))
        {
            loadHandler(false);
            return;
        }
        var resourceInfo = new shetab.SEResourceManager.SEResourceInfo();
        shetab.common.serialization.Serializer.deserialize(resourceInfo, httpRequest.responseXML.documentElement);
        var wait = new shetab.SEWait(resourceInfo.resourceUrls.length);
        for (var $i3 = 0, $t3 = resourceInfo.resourceUrls, $l3 = $t3.length, item = $t3[$i3]; $i3 < $l3; $i3++, item = $t3[$i3])
        {
            var resourceUrl = shetab.common.Uri.combine(folderInfoUrl, item);
            this.addResource$$String$$String$$String$$JsAction(resourceUrl, culture, module, $CreateAnonymousDelegate(this, function (result)
            {
                wait.release();
            }));
        }
        wait.waitAll($CreateAnonymousDelegate(this, function ()
        {
            loadHandler(true);
        }));
    }));
};
shetab.SEResourceManager.prototype.getStoreName = function (module, fileTitle)
 {
    var storeName = (module !== null) ? module + ":" + fileTitle : fileTitle;
    return storeName.toLowerCase();
};
shetab.SEResourceManager.prototype.addResource$$String$$String$$Document$$String = function (culture, module, resXdoc, resXdocUrl)
 {
    var fileTitle = shetab.common.Uri.getFileNameWithoutExtension(resXdocUrl);
    if (shetab.common.Uri.getExtension(fileTitle).toLowerCase() === "xml")
        fileTitle = shetab.common.Uri.getFileNameWithoutExtension(fileTitle);
    if (shetab.common.Uri.getExtension(fileTitle).toLowerCase() === "resx")
        fileTitle = shetab.common.Uri.getFileNameWithoutExtension(fileTitle);
    var storeName = this.getStoreName(module, fileTitle);
    if (!this.get_resourceManagers().hasOwnProperty(storeName))
        this.get_resourceManagers()[storeName] = new shetab.common.resource.ResourceManager();
    this.get_resourceManagers()[storeName].addResource(culture, resXdoc, resXdocUrl);
};
shetab.SEResourceManager.prototype.addResource$$String$$String$$String$$JsAction = function (resXdocUrl, culture, module, loadHandler)
 {


    shetab.SEUtility.loadFile(resXdocUrl, $CreateAnonymousDelegate(this, function (httpRequest)
    {
        if (!shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status))
        {
            loadHandler(false);
            return;
        }
        this.addResource$$String$$String$$Document$$String(culture, module, httpRequest.responseXML, resXdocUrl);
        loadHandler(true);
    }));
};
shetab.SEResourceManager.prototype.getString$$String$$String$$String = function (module, fileTitle, name)
 {
    return this.getString$$String$$String$$String$$String(module, fileTitle, name, null);
};
shetab.SEResourceManager.prototype.getString$$String$$String$$String$$String = function (module, fileTitle, name, culture)
 {
    var storeName = this.getStoreName(module, fileTitle);
    return this.get_resourceManagers().hasOwnProperty(storeName) ? this.get_resourceManagers()[storeName].getString(name, culture, (culture !== null ? culture : this.get_defaultCulture())) : null;
};
if (typeof(shetab.SEResourceManager) == "undefined")
    shetab.SEResourceManager = {};
shetab.SEResourceManager.SEResourceInfo = function ()
 {
    this.resourceUrls =  [];
};
shetab.SEResourceManager.SEResourceInfo.prototype.getSerializationInfo = function (info, context)
 {
    var resourcesPI = info.addArray("resourceUrls",  String, "resource");
    resourcesPI.set_collectionElementName("resources");
    resourcesPI.itemInfo.set_attributeName("url");
};
shetab.SEUtility = function ()
 {
};
shetab.SEUtility.checkRequests = function (requests, action)
 {
    var checkIntervalId = 0;
    checkIntervalId = setInterval(function ()
    {
        for (var $i4 = 0, $l4 = requests.length, item = requests[$i4]; $i4 < $l4; $i4++, item = requests[$i4])
        {
            if (item.readyState !== XMLHttpRequest.DONE || item.status !== 200)
                return;
        }
        clearInterval(checkIntervalId);
        action();
    }, 5);
};
shetab.SEUtility.jsObjectKeyToArray = function (obj)
 {
    var ret =  [];
    for (var key in obj)
        ret.push(key);
    return ret;
};
shetab.SEUtility.loadFile = function (url, loadFileHandler, data)
 {
    data = shetab.common.Utility.checkUndefined(data, null);
    var httpRequest = shetab.common.Xml.createXmlHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.onreadystatechange = function ()
    {
        if (httpRequest.readyState !== 4)
            return;
        loadFileHandler(httpRequest, data);
    };
    httpRequest.send();
    return httpRequest;
};
shetab.SEUtility.loadHandler$1 = function (context, action)
 {
    return function (success)
    {
        action(success, context);
    };
};
shetab.SEUtility.isDoDefaultError = function (err)
 {
    return shetab.common.Utility.isTypeOf(err,  shetab.common.error.NotImplementedError) || shetab.common.Utility.isTypeOf(err,  shetab.common.error.DoDefaultError);
};
shetab.SEProjectData = function ()
 {
    this._id = null;
    this._mediaId = null;
    this._culture = null;
};
shetab.SEProjectData.prototype.get_id = function ()
 {
    return this._id;
};
shetab.SEProjectData.prototype.set_id = function (value)
 {
    this._id = value;
};
Object.defineProperty(shetab.SEProjectData.prototype, "id", {get: shetab.SEProjectData.prototype.get_id, set: shetab.SEProjectData.prototype.set_id, enumerable: true});
shetab.SEProjectData.prototype.get_mediaId = function ()
 {
    return this._mediaId;
};
shetab.SEProjectData.prototype.set_mediaId = function (value)
 {
    this._mediaId = value;
};
Object.defineProperty(shetab.SEProjectData.prototype, "mediaId", {get: shetab.SEProjectData.prototype.get_mediaId, set: shetab.SEProjectData.prototype.set_mediaId, enumerable: true});
shetab.SEProjectData.prototype.get_culture = function ()
 {
    return this._culture;
};
shetab.SEProjectData.prototype.set_culture = function (value)
 {
    this._culture = value;
};
Object.defineProperty(shetab.SEProjectData.prototype, "culture", {get: shetab.SEProjectData.prototype.get_culture, set: shetab.SEProjectData.prototype.set_culture, enumerable: true});
shetab.SEPublishSettings = function ()
 {
    this._mediaId = null;
};
shetab.SEPublishSettings.prototype.get_mediaId = function ()
 {
    return this._mediaId;
};
shetab.SEPublishSettings.prototype.set_mediaId = function (value)
 {
    this._mediaId = value;
};
Object.defineProperty(shetab.SEPublishSettings.prototype, "mediaId", {get: shetab.SEPublishSettings.prototype.get_mediaId, set: shetab.SEPublishSettings.prototype.set_mediaId, enumerable: true});
shetab.SEProject = function (projectUrl)
 {
    this.dataLoaded = null;
    this._projectUrl = null;
    this._storageFolderUrl = null;
    this._publishSettings = null;
    this._data = null;
    this.set_projectUrl(projectUrl);
    this.set_storageFolderUrl(shetab.common.Uri.combine(projectUrl, "Storage/"));
};
shetab.SEProject.prototype.get_projectUrl = function ()
 {
    return this._projectUrl;
};
shetab.SEProject.prototype.set_projectUrl = function (value)
 {
    this._projectUrl = value;
};
Object.defineProperty(shetab.SEProject.prototype, "projectUrl", {get: shetab.SEProject.prototype.get_projectUrl, set: shetab.SEProject.prototype.set_projectUrl, enumerable: true});
shetab.SEProject.prototype.get_storageFolderUrl = function ()
 {
    return this._storageFolderUrl;
};
shetab.SEProject.prototype.set_storageFolderUrl = function (value)
 {
    this._storageFolderUrl = value;
};
Object.defineProperty(shetab.SEProject.prototype, "storageFolderUrl", {get: shetab.SEProject.prototype.get_storageFolderUrl, set: shetab.SEProject.prototype.set_storageFolderUrl, enumerable: true});
shetab.SEProject.prototype.get_publishSettings = function ()
 {
    return this._publishSettings;
};
shetab.SEProject.prototype.set_publishSettings = function (value)
 {
    this._publishSettings = value;
};
Object.defineProperty(shetab.SEProject.prototype, "publishSettings", {get: shetab.SEProject.prototype.get_publishSettings, set: shetab.SEProject.prototype.set_publishSettings, enumerable: true});
shetab.SEProject.prototype.get_data = function ()
 {
    return this._data;
};
shetab.SEProject.prototype.set_data = function (value)
 {
    this._data = value;
};
Object.defineProperty(shetab.SEProject.prototype, "data", {get: shetab.SEProject.prototype.get_data, set: shetab.SEProject.prototype.set_data, enumerable: true});
shetab.SEProject.prototype.add_dataLoaded = function (value)
 {
    this.dataLoaded = $CombineDelegates(this.dataLoaded, value);
};
shetab.SEProject.prototype.remove_dataLoaded = function (value)
 {
    this.dataLoaded = $RemoveDelegate(this.dataLoaded, value);
};
shetab.SEProject.prototype.load = function (loadHandler)
 {
    shetab.SEUtility.loadFile(this.get_projectUrl(), $CreateAnonymousDelegate(this, function (httpRequest)
    {
        this.set_data(new shetab.SEProjectData());
        this.serialize(httpRequest.responseXML.documentElement, false);
        if (this.dataLoaded !== null)
            this.dataLoaded();
    }));
};
shetab.SEProject.prototype.serialize = function (element, save)
 {
    if (save)
    {
    }
    else
    {
    }
};
shetab.SEMessage = function ()
 {
    this.targetInstanceId = null;
    this.callerInstanceId = null;
    this.context = null;
    this.typeName = null;
    this.methodName = null;
    this.parameters = null;
    this.parameters = new Object();
};
shetab.SEMessage.c_unhandled = "$$unhandled";
shetab.SEMessage.c_undefined = "$$undefined";
shetab.SEMessage.c_error = "$$error";
shetab.SEMessage.c_null = "$$null";
shetab.SEMessage._lastCallbackId = 0;
shetab.SEMessage.callbacks = new Object();
shetab.SEMessage.prepareResult = function (value)
 {
    if (shetab.common.StringHelper.startsWith(value, shetab.SEMessage.c_error))
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
        throw new Error(value.substr(shetab.SEMessage.c_error.length + 1));
    }
    if (value === shetab.SEMessage.c_undefined)
        value = undefined;
    if (value === shetab.SEMessage.c_null)
        value = null;
    return value;
};
shetab.SEMessage.prototype.toXml = function ()
 {
    var xmlDoc = shetab.common.Xml.createXmlDoc("seMessage");
    shetab.common.serialization.Serializer.serialize(this, xmlDoc.documentElement);
    return shetab.common.Xml.toXmlString(xmlDoc);
};
shetab.SEMessage.fromXml = function (xml)
 {
    var xmlDoc = shetab.common.Xml.loadXmlString(xml);
    var ret = new shetab.SEMessage();
    shetab.common.serialization.Serializer.deserialize(ret, xmlDoc.documentElement);
    return ret;
};
shetab.SEMessage.prototype.getSerializationInfo = function (info, serializeContext)
 {
    info.addString("targetInstanceId");
    info.addString("methodName");
    info.addString("typeName");
    info.addString("context");
    var instanceIdPi = info.addString("callerInstanceId");
    instanceIdPi.set_elementName("caller");
    instanceIdPi.set_attributeName("instanceId");
    info.addDictionary("parameters",  shetab.SEMessage.Parameter, "param", "name").set_collectionElementName("params");
};
shetab.SEMessage.prototype.getParam = function (paramName, defValue)
 {
    defValue = shetab.common.Utility.checkUndefined(defValue, null);
    var res = this.parameters[paramName];
    if (!shetab.common.Utility.isDefined(res))
        return defValue;
    var ret = (res.valueCDATA !== null ? res.valueCDATA : res.value);
    return ret === shetab.SEMessage.c_null ? null : ret;
};
shetab.SEMessage.prototype.getParamByteArray = function (paramName)
 {
    var ret = this.parameters[paramName];
    if (!shetab.common.Utility.isDefined(ret))
        return null;
    return ret.valueByteArray;
};
shetab.SEMessage.prototype.setParam = function (paramName, value, useCDATA)
 {
    value = (value !== null ? value : shetab.SEMessage.c_null);
    useCDATA = shetab.common.Utility.checkUndefined(useCDATA, false);
    this.parameters[paramName] = useCDATA ? (function ()
    {
        var $v1 = new shetab.SEMessage.Parameter();
        $v1.valueCDATA = value;
        return $v1;
    }).call(this) : (function ()
    {
        var $v2 = new shetab.SEMessage.Parameter();
        $v2.value = value;
        return $v2;
    }).call(this);
};
shetab.SEMessage.prototype.setParamByteArray = function (paramName, value)
 {
    this.parameters[paramName] = (function ()
    {
        var $v3 = new shetab.SEMessage.Parameter();
        $v3.valueByteArray = value;
        return $v3;
    }).call(this);
};
shetab.SEMessage.array_toString = function (items)
 {
    var converter = (function ()
    {
        var $v4 = new shetab.common.converters.ObjectConverter();
        $v4.nullValue = shetab.SEMessage.c_null;
        $v4.serializerRootElementName = "item";
        return $v4;
    }).call(this);
    var strings =  [];
    for (var $i5 = 0, $l5 = items.length, item = items[$i5]; $i5 < $l5; $i5++, item = items[$i5])
        strings.push(converter.convert(item, null , null));
    return strings.length === 0 ? "" : strings.join("#$$;");
};
shetab.SEMessage.array_fromString = function (value, typeCtor)
 {
    var converter = (function ()
    {
        var $v5 = new shetab.common.converters.ObjectConverter();
        $v5.nullValue = shetab.SEMessage.c_null;
        $v5.serializerRootElementName = "item";
        return $v5;
    }).call(this);
    var strings = value === "" ?  [] : value.split("#$$;");
    var items =  [];
    for (var $i6 = 0, $l6 = strings.length, item = strings[$i6]; $i6 < $l6; $i6++, item = strings[$i6])
        items.push(converter.convertBack(item, typeCtor, null));
    return items;
};
shetab.SEMessage.dictionary_toString = function (items)
 {
    var converter = (function ()
    {
        var $v6 = new shetab.common.converters.ObjectConverter();
        $v6.nullValue = shetab.SEMessage.c_null;
        $v6.serializerRootElementName = "item";
        return $v6;
    }).call(this);
    var strings =  [];
    for (var item in items)
        strings.push(item + "#$$!;" + converter.convert(items[item], null , null));
    return strings.length === 0 ? "" : strings.join("#$$;");
};
shetab.SEMessage.dictionary_fromString = function (value, typeCtor)
 {
    var converter = (function ()
    {
        var $v7 = new shetab.common.converters.ObjectConverter();
        $v7.nullValue = shetab.SEMessage.c_null;
        $v7.serializerRootElementName = "item";
        return $v7;
    }).call(this);
    var strings = value === "" ?  [] : value.split("#$$;");
    var items = new Object();
    for (var $i7 = 0, $l7 = strings.length, item = strings[$i7]; $i7 < $l7; $i7++, item = strings[$i7])
    {
        var tokens = item.split("#$$!;");
        items[tokens[0]] = converter.convertBack(tokens[1], typeCtor, null);
    }
    return items;
};
shetab.SEMessage.getCallbackIdFromFunction = function (callback)
 {
    var callbackId = (++shetab.SEMessage._lastCallbackId).toString();
    shetab.SEMessage.callbacks[callbackId] = callback;
    return callbackId;
};
shetab.SEMessage.getFunctionFromCallbackId = function (callbackId)
 {
    return shetab.common.Utility.checkUndefined(shetab.SEMessage.callbacks[callbackId], null);
};
if (typeof(shetab.SEMessage) == "undefined")
    shetab.SEMessage = {};
shetab.SEMessage.Parameter = function ()
 {
    this.value = null;
    this.valueCDATA = null;
    this.valueByteArray = null;
};
shetab.SEMessage.Parameter.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("value").set_attributeName(null);
    info.addByteArray("valueByteArray");
    var cdataInfo = info.addString("valueCDATA");
    cdataInfo.set_attributeName(shetab.common.serialization.SerializationInfo.tagCDATA);
};
shetab.SEFolderInfo = function ()
 {
    this._folders = null;
    this._files = null;
    this.set_folders( []);
    this.set_files( []);
};
shetab.SEFolderInfo.prototype.get_folders = function ()
 {
    return this._folders;
};
shetab.SEFolderInfo.prototype.set_folders = function (value)
 {
    this._folders = value;
};
Object.defineProperty(shetab.SEFolderInfo.prototype, "folders", {get: shetab.SEFolderInfo.prototype.get_folders, set: shetab.SEFolderInfo.prototype.set_folders, enumerable: true});
shetab.SEFolderInfo.prototype.get_files = function ()
 {
    return this._files;
};
shetab.SEFolderInfo.prototype.set_files = function (value)
 {
    this._files = value;
};
Object.defineProperty(shetab.SEFolderInfo.prototype, "files", {get: shetab.SEFolderInfo.prototype.get_files, set: shetab.SEFolderInfo.prototype.set_files, enumerable: true});
shetab.SEFolderInfo.prototype.getSerializationInfo = function (info, context)
 {
    info.addArray("folders",  String, "folder").itemInfo.set_attributeName("url");
    info.addArray("files",  String, "file").itemInfo.set_attributeName("url");
};
shetab.SEGlobal = function ()
 {
};
shetab.SEGlobal.fileext_project = ".eBookProjectXml";


shetab.SEGlobal.fileext_book = ".eBookModuleXml";
shetab.SEGlobal.fileext_projectpack = ".eBook";
shetab.SEGlobal.fileext_bookpack = ".eBookModule";
shetab.SEGlobal.fileext_effectset = ".eBookEffectSetXml";
shetab.SEGlobal.fileext_skinPack = ".eBookSkin";
shetab.SEGlobal.fileext_plugin = ".eBookPluginXml";
shetab.SEGlobal.fileext_pluginPack = ".eBookPlugin";
shetab.SEGlobal.fileext_action = ".eBookActionXml";
shetab.SEGlobal.filename_plugin = "Plugin.eBookPluginXml";
shetab.SEGlobal.filename_pluginPack = "Plugin.eBookPlugin";
shetab.SEGlobal.filename_action = "Action.eBookActionXml";
shetab.SEGlobal.filename_project = "Project.eBookProjectXml";
shetab.SEGlobal.filename_book = "Book.eBookModuleXml";
shetab.SEGlobal.filename_bookpack = "Book.eBookModule";
shetab.SEGlobal.filename_redistspack = "Redistributes.zip";
shetab.SEGlobal.filename_skin = "Skin.xml";
shetab.SEGlobal.filename_publish = "Publish.xml";
shetab.SEGlobal.filename_ebooklauncherxml = "EbookLauncher.xml";
shetab.SEGlobal.filename_softLockParam = "LicenseControlParam.xml";
shetab.SEGlobal.filename_softLockLicense = "Project.license";
shetab.SEGlobal.filename_userData = "UserData.xml";
shetab.SEGlobal.filename_userOptions = "Options.xml";
shetab.SEGlobal.filename_blank = "$Blank$";
shetab.SEGlobal.filename_activeStorage = "ActiveStorage";
shetab.SEGlobal.filename_ebookreader = "EbookReader.exe";
shetab.SEGlobal.filename_customProperties = "CustomProperties.xml";
shetab.SEGlobal.filename_customPropertiesValue = "CustomPropertiesValue.xml";
shetab.SEGlobal.filename_config = "Config.xml";
shetab.SEGlobal.filename_module = "Module.xml";
shetab.SEGlobal.filename_moduleEntity = "ModuleEntity.xml";
shetab.SEGlobal.filename_storageFolder = "Storage";
shetab.SEGlobal.filename_resourceInfo = "ResourceInfo.xml";
shetab.SEGlobal.placeolderId_skin = "skin";
shetab.SEGlobal.skinid_creator = "{33C69530-5767-40C8-B8BF-12C13F0CE9FD}";
shetab.SEGlobal.skinid_classic = "{6BE8D6CD-110D-417C-8BAC-257E0ECC4619}";
shetab.SEGlobal.skinid_blueSky = "{DBB2AB57-D0D3-481E-B24D-C50FA6A98E1F}";
shetab.SEGlobal.skinid_ikreos = "{c04f12d2-7ca9-4750-a08f-27a7895bca7c}";
shetab.SEGlobal.skinid_default = shetab.SEGlobal.skinid_ikreos;
shetab.SEGlobal.effectsetid_default = "{4E3BCCB4-043E-42f4-8238-69F6DFC8EC2C}";
shetab.SEGlobal.effectid_random = "Random";
shetab.SEGlobal.demo_itemcount = 25;
shetab.SEGlobal.demo_minFileSize = 30000;
shetab.SEGlobal.demo_maxFileStack = 150;
shetab.SEGlobal.crypt_keycontainer = "ShetabEbookKC";
shetab.SEGlobal.resource_imagetype = "IMAGE";
shetab.SEGlobal.max_meidaLabelLength = 32;
shetab.SEGlobal.profileUrl = "Shetab/eBook/5.0/";
shetab.SEGlobal.moduleName_local = "local";
shetab.SEGlobal.moduleName_creator = "creator";
shetab.SEGlobal.moduleName_reader = "reader";
shetab.SEGlobal.defaultCulture = "en-US";
shetab.SEGlobal.keh_farsi_ansi = 152;
shetab.SEGlobal.keh_farsi_wide = 1705;
shetab.SEGlobal.keh_arabic_ansi = 223;
shetab.SEGlobal.keh_arabic_wide = 1603;
shetab.SEGlobal.yeh_farsi_wide = 1740;
shetab.SEGlobal.yeh_arabic_wide = 1610;
shetab.SEGlobal.yehmacs_arabic_wide = 1609;
shetab.SEGlobal.farsi_comma = 1548;
shetab.SEGlobal.farsi_semicolen = 1563;
shetab.SEWait = function (workerCount)
 {
    this.workerCount = 0;
    this.allDone = null;
    this.workerCount = shetab.common.Utility.checkUndefined(workerCount, 0);
};
shetab.SEWait.prototype.add_allDone = function (value)
 {
    this.allDone = $CombineDelegates(this.allDone, value);
};
shetab.SEWait.prototype.remove_allDone = function (value)
 {
    this.allDone = $RemoveDelegate(this.allDone, value);
};
shetab.SEWait.prototype.add = function ()
 {
    this.workerCount++;
};
shetab.SEWait.prototype.release = function ()
 {
    this.workerCount--;
    this.checkWaitAll();
};
shetab.SEWait.prototype.checkWaitAll = function ()
 {
    if (this.workerCount === 0 && this.allDone !== null)
        this.allDone();
};
shetab.SEWait.prototype.waitAll = function (action)
 {
    this.add_allDone(action);
    this.checkWaitAll();
};
if (typeof(shetab) == "undefined")
    var shetab = {};
if (typeof(shetab.api) == "undefined")
    shetab.api = {};
shetab.api.SEApiInvoker = function ()
 {
    this._context = null;
    this._targetInstanceId = null;
};
shetab.api.SEApiInvoker.prototype.invokeGetProperty = function (propertyName, testValue)
 {
    var msg = (function ()
    {
        var $v1 = new shetab.SEMessage();
        $v1.methodName = "getProperty";
        return $v1;
    }).call(this);
    msg.setParam("propertyName", propertyName);
    msg.setParam("testValue", testValue);
    return this.invoke(msg);
};
shetab.api.SEApiInvoker.prototype.invokeSetProperty = function (propertyName, propertyValue)
 {
    var msg = (function ()
    {
        var $v2 = new shetab.SEMessage();
        $v2.methodName = "setProperty";
        return $v2;
    }).call(this);
    msg.setParam("propertyName", propertyName);
    msg.setParam("propertyValue", propertyValue);
    this.invoke(msg);
};
shetab.api.SEApiInvoker.prototype.invoke = function (msg)
 {
    msg.context = this.get_context();
    msg.targetInstanceId = this.get_targetInstanceId();
    msg.typeName = this.get_typeName();
    return shetab.SEMessage.prepareResult(shetab.SEEngine.get_current().processOutgoingMessage(msg));
};
shetab.api.SEApiInvoker.prototype.invokeExecuteCommand = function (commandName)
 {
    throw new Error("Agent does not support command!");
};
shetab.api.SEApiInvoker.prototype.getAllCommandNames = function ()
 {
    return  [];
};
shetab.api.SEApiInvoker.prototype.get_context = function ()
 {
    return this._context;
};
shetab.api.SEApiInvoker.prototype.set_context = function (value)
 {
    this._context = value;
};
Object.defineProperty(shetab.api.SEApiInvoker.prototype, "context", {get: shetab.api.SEApiInvoker.prototype.get_context, set: shetab.api.SEApiInvoker.prototype.set_context, enumerable: true});
shetab.api.SEApiInvoker.prototype.get_targetInstanceId = function ()
 {
    return this._targetInstanceId;
};
shetab.api.SEApiInvoker.prototype.set_targetInstanceId = function (value)
 {
    this._targetInstanceId = value;
};
Object.defineProperty(shetab.api.SEApiInvoker.prototype, "targetInstanceId", {get: shetab.api.SEApiInvoker.prototype.get_targetInstanceId, set: shetab.api.SEApiInvoker.prototype.set_targetInstanceId, enumerable: true});
Object.defineProperty(shetab.api.SEApiInvoker.prototype, "typeName", {enumerable: true});
shetab.api.SEAgent = function ()
 {
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SEAgent.prototype.get_typeName = function ()
 {
    return "Agent";
};
Object.defineProperty(shetab.api.SEAgent.prototype, "typeName", {get: shetab.api.SEAgent.prototype.get_typeName, enumerable: true});
shetab.api.SEAgent.prototype.isModuleInstanceExists = function (moduleInstanceId)
 {
    var msg = (function ()
    {
        var $v3 = new shetab.SEMessage();
        $v3.methodName = "isModuleInstanceExists";
        return $v3;
    }).call(this);
    if (shetab.common.Utility.isDefined(moduleInstanceId))
        msg.setParam("moduleInstanceId", moduleInstanceId);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.api.SEAgent.prototype.fireUpdateUI = function ()
 {
    var msg = (function ()
    {
        var $v4 = new shetab.SEMessage();
        $v4.methodName = "fireUpdateUI";
        return $v4;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEAgent.prototype.firePropertyBagChanged = function (moduleEntities, changeSetId)
 {
    var msg = (function ()
    {
        var $v5 = new shetab.SEMessage();
        $v5.methodName = "firePropertyBagChanged";
        return $v5;
    }).call(this);
    if (shetab.common.Utility.isDefined(moduleEntities))

        msg.setParam("moduleEntities", (moduleEntities === null) ? null : shetab.SEMessage.array_toString(moduleEntities));
    if (shetab.common.Utility.isDefined(changeSetId))
        msg.setParam("changeSetId", changeSetId);
    this.invoke(msg);
};
shetab.api.SEAgent.prototype.firePropertiesChanged = function (properties)
 {
    var msg = (function ()
    {
        var $v6 = new shetab.SEMessage();
        $v6.methodName = "firePropertiesChanged";
        return $v6;
    }).call(this);
    if (shetab.common.Utility.isDefined(properties))
        msg.setParam("properties", (properties === null) ? null : shetab.SEMessage.array_toString(properties));
    this.invoke(msg);
};
shetab.api.SEAgent.prototype.fireRefreshTopics = function ()
 {
    var msg = (function ()
    {
        var $v7 = new shetab.SEMessage();
        $v7.methodName = "fireRefreshTopics";
        return $v7;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEAgent.prototype.fireCustomNotify = function (notifyName, notifyValue)
 {
    var msg = (function ()
    {
        var $v8 = new shetab.SEMessage();
        $v8.methodName = "fireCustomNotify";
        return $v8;
    }).call(this);
    if (shetab.common.Utility.isDefined(notifyName))
        msg.setParam("notifyName", notifyName);
    if (shetab.common.Utility.isDefined(notifyValue))
        msg.setParam("notifyValue", notifyValue);
    this.invoke(msg);
};
shetab.api.SEAgent.prototype.initializeModulePlaceholder = function (placeholderId, url)
 {
    var msg = (function ()
    {
        var $v9 = new shetab.SEMessage();
        $v9.methodName = "initializeModulePlaceholder";
        return $v9;
    }).call(this);
    if (shetab.common.Utility.isDefined(placeholderId))
        msg.setParam("placeholderId", placeholderId);
    if (shetab.common.Utility.isDefined(url))
        msg.setParam("url", url);
    this.invoke(msg);
};
shetab.api.SEAgent.prototype.invokeStorageCallback = function (callbackId, success, statusText, responseText, responseByteArray, type)
 {
    var msg = (function ()
    {
        var $v10 = new shetab.SEMessage();
        $v10.methodName = "invokeStorageCallback";
        return $v10;
    }).call(this);
    if (shetab.common.Utility.isDefined(callbackId))
        msg.setParam("callbackId", callbackId);
    if (shetab.common.Utility.isDefined(success))
        msg.setParam("success", (success === null) ? null : success.toString());
    if (shetab.common.Utility.isDefined(statusText))
        msg.setParam("statusText", statusText);
    if (shetab.common.Utility.isDefined(responseText))
        msg.setParam("responseText", responseText, true);
    if (shetab.common.Utility.isDefined(responseByteArray))
        msg.setParamByteArray("responseByteArray", responseByteArray);
    if (shetab.common.Utility.isDefined(type))
        msg.setParam("type", type);
    this.invoke(msg);
};
shetab.api.SEAgent.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SEAgent, shetab.api.SEApiInvoker);
shetab.api.SEDocumentCommandHandler = function ()
 {
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SEDocumentCommandHandler.prototype.get_typeName = function ()
 {
    return "DocumentCommandHandler";
};
Object.defineProperty(shetab.api.SEDocumentCommandHandler.prototype, "typeName", {get: shetab.api.SEDocumentCommandHandler.prototype.get_typeName, enumerable: true});
shetab.api.SEDocumentCommandHandler.prototype.get_currentBookmark = function ()
 {
    return this.invokeGetProperty("currentBookmark", "");
};
Object.defineProperty(shetab.api.SEDocumentCommandHandler.prototype, "currentBookmark", {get: shetab.api.SEDocumentCommandHandler.prototype.get_currentBookmark, enumerable: true});
shetab.api.SEDocumentCommandHandler.prototype.get_isOpen = function ()
 {
    var ret = this.invokeGetProperty("isOpen", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEDocumentCommandHandler.prototype, "isOpen", {get: shetab.api.SEDocumentCommandHandler.prototype.get_isOpen, enumerable: true});
shetab.api.SEDocumentCommandHandler.prototype.open = function (url, pageNumber, bookmark)
 {
    var msg = (function ()
    {
        var $v11 = new shetab.SEMessage();
        $v11.methodName = "open";
        return $v11;
    }).call(this);
    if (shetab.common.Utility.isDefined(url))
        msg.setParam("url", url);
    if (shetab.common.Utility.isDefined(pageNumber))
        msg.setParam("pageNumber", (pageNumber === null) ? null : pageNumber.toString());
    if (shetab.common.Utility.isDefined(bookmark))
        msg.setParam("bookmark", bookmark);
    this.invoke(msg);
};
shetab.api.SEDocumentCommandHandler.prototype.goToBookmark = function (bookmark)
 {
    var msg = (function ()
    {
        var $v12 = new shetab.SEMessage();
        $v12.methodName = "goToBookmark";
        return $v12;
    }).call(this);
    if (shetab.common.Utility.isDefined(bookmark))
        msg.setParam("bookmark", bookmark);
    this.invoke(msg);
};
shetab.api.SEDocumentCommandHandler.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SEDocumentCommandHandler, shetab.api.SEApiInvoker);
shetab.api.SEEditCommandHandler = function ()
 {
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SEEditCommandHandler.prototype.get_typeName = function ()
 {
    return "EditCommandHandler";
};
Object.defineProperty(shetab.api.SEEditCommandHandler.prototype, "typeName", {get: shetab.api.SEEditCommandHandler.prototype.get_typeName, enumerable: true});
shetab.api.SEEditCommandHandler.prototype.get_canCopy = function ()
 {
    var ret = this.invokeGetProperty("canCopy", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEEditCommandHandler.prototype, "canCopy", {get: shetab.api.SEEditCommandHandler.prototype.get_canCopy, enumerable: true});
shetab.api.SEEditCommandHandler.prototype.get_canCut = function ()
 {
    var ret = this.invokeGetProperty("canCut", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEEditCommandHandler.prototype, "canCut", {get: shetab.api.SEEditCommandHandler.prototype.get_canCut, enumerable: true});
shetab.api.SEEditCommandHandler.prototype.get_canPaste = function ()
 {
    var ret = this.invokeGetProperty("canPaste", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEEditCommandHandler.prototype, "canPaste", {get: shetab.api.SEEditCommandHandler.prototype.get_canPaste, enumerable: true});
shetab.api.SEEditCommandHandler.prototype.get_canDel = function ()
 {
    var ret = this.invokeGetProperty("canDel", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEEditCommandHandler.prototype, "canDel", {get: shetab.api.SEEditCommandHandler.prototype.get_canDel, enumerable: true});
shetab.api.SEEditCommandHandler.prototype.get_canSelectAll = function ()
 {
    var ret = this.invokeGetProperty("canSelectAll", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEEditCommandHandler.prototype, "canSelectAll", {get: shetab.api.SEEditCommandHandler.prototype.get_canSelectAll, enumerable: true});
shetab.api.SEEditCommandHandler.prototype.copy = function ()
 {
    var msg = (function ()
    {
        var $v13 = new shetab.SEMessage();
        $v13.methodName = "copy";
        return $v13;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEEditCommandHandler.prototype.cut = function ()

 {
    var msg = (function ()
    {
        var $v14 = new shetab.SEMessage();
        $v14.methodName = "cut";
        return $v14;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEEditCommandHandler.prototype.paste = function ()
 {
    var msg = (function ()
    {
        var $v15 = new shetab.SEMessage();
        $v15.methodName = "paste";
        return $v15;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEEditCommandHandler.prototype.del = function ()
 {
    var msg = (function ()
    {
        var $v16 = new shetab.SEMessage();
        $v16.methodName = "del";
        return $v16;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEEditCommandHandler.prototype.selectAll = function ()
 {
    var msg = (function ()
    {
        var $v17 = new shetab.SEMessage();
        $v17.methodName = "selectAll";
        return $v17;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEEditCommandHandler.prototype.clearSelection = function ()
 {
    var msg = (function ()
    {
        var $v18 = new shetab.SEMessage();
        $v18.methodName = "clearSelection";
        return $v18;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEEditCommandHandler.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SEEditCommandHandler, shetab.api.SEApiInvoker);
shetab.api.SEMediaCommandHandler = function ()
 {
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SEMediaCommandHandler.prototype.get_typeName = function ()
 {
    return "MediaCommandHandler";
};
Object.defineProperty(shetab.api.SEMediaCommandHandler.prototype, "typeName", {get: shetab.api.SEMediaCommandHandler.prototype.get_typeName, enumerable: true});
shetab.api.SEMediaCommandHandler.prototype.get_mediaState = function ()
 {
    return this.invokeGetProperty("mediaState", "");
};
shetab.api.SEMediaCommandHandler.prototype.set_mediaState = function (value)
 {
    this.invokeSetProperty("mediaState", value);
};
Object.defineProperty(shetab.api.SEMediaCommandHandler.prototype, "mediaState", {get: shetab.api.SEMediaCommandHandler.prototype.get_mediaState, set: shetab.api.SEMediaCommandHandler.prototype.set_mediaState, enumerable: true});
shetab.api.SEMediaCommandHandler.prototype.get_canNextMedia = function ()
 {
    var ret = this.invokeGetProperty("canNextMedia", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEMediaCommandHandler.prototype, "canNextMedia", {get: shetab.api.SEMediaCommandHandler.prototype.get_canNextMedia, enumerable: true});
shetab.api.SEMediaCommandHandler.prototype.get_canPreviousMedia = function ()
 {
    var ret = this.invokeGetProperty("canPreviousMedia", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEMediaCommandHandler.prototype, "canPreviousMedia", {get: shetab.api.SEMediaCommandHandler.prototype.get_canPreviousMedia, enumerable: true});
shetab.api.SEMediaCommandHandler.prototype.get_mediaPosition = function ()
 {
    var ret = this.invokeGetProperty("mediaPosition", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.api.SEMediaCommandHandler.prototype.set_mediaPosition = function (value)
 {
    this.invokeSetProperty("mediaPosition", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.api.SEMediaCommandHandler.prototype, "mediaPosition", {get: shetab.api.SEMediaCommandHandler.prototype.get_mediaPosition, set: shetab.api.SEMediaCommandHandler.prototype.set_mediaPosition, enumerable: true});
shetab.api.SEMediaCommandHandler.prototype.get_mediaLength = function ()
 {
    var ret = this.invokeGetProperty("mediaLength", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
Object.defineProperty(shetab.api.SEMediaCommandHandler.prototype, "mediaLength", {get: shetab.api.SEMediaCommandHandler.prototype.get_mediaLength, enumerable: true});
shetab.api.SEMediaCommandHandler.prototype.get_loopMedia = function ()
 {
    var ret = this.invokeGetProperty("loopMedia", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.api.SEMediaCommandHandler.prototype.set_loopMedia = function (value)
 {
    this.invokeSetProperty("loopMedia", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.api.SEMediaCommandHandler.prototype, "loopMedia", {get: shetab.api.SEMediaCommandHandler.prototype.get_loopMedia, set: shetab.api.SEMediaCommandHandler.prototype.set_loopMedia, enumerable: true});
shetab.api.SEMediaCommandHandler.prototype.canSetMediaState = function (state)
 {
    var msg = (function ()
    {
        var $v19 = new shetab.SEMessage();
        $v19.methodName = "canSetMediaState";
        return $v19;
    }).call(this);
    if (shetab.common.Utility.isDefined(state))
        msg.setParam("state", state);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.api.SEMediaCommandHandler.prototype.nextMedia = function ()
 {
    var msg = (function ()
    {
        var $v20 = new shetab.SEMessage();
        $v20.methodName = "nextMedia";
        return $v20;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEMediaCommandHandler.prototype.previousMedia = function ()
 {
    var msg = (function ()
    {
        var $v21 = new shetab.SEMessage();
        $v21.methodName = "previousMedia";
        return $v21;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEMediaCommandHandler.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SEMediaCommandHandler, shetab.api.SEApiInvoker);
shetab.api.SEPageCommandHandler = function ()
 {
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SEPageCommandHandler.prototype.get_typeName = function ()
 {
    return "PageCommandHandler";
};
Object.defineProperty(shetab.api.SEPageCommandHandler.prototype, "typeName", {get: shetab.api.SEPageCommandHandler.prototype.get_typeName, enumerable: true});
shetab.api.SEPageCommandHandler.prototype.get_pageNumber = function ()
 {
    var ret = this.invokeGetProperty("pageNumber", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.api.SEPageCommandHandler.prototype.set_pageNumber = function (value)
 {
    this.invokeSetProperty("pageNumber", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.api.SEPageCommandHandler.prototype, "pageNumber", {get: shetab.api.SEPageCommandHandler.prototype.get_pageNumber, set: shetab.api.SEPageCommandHandler.prototype.set_pageNumber, enumerable: true});
shetab.api.SEPageCommandHandler.prototype.get_pageCount = function ()
 {
    var ret = this.invokeGetProperty("pageCount", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
Object.defineProperty(shetab.api.SEPageCommandHandler.prototype, "pageCount", {get: shetab.api.SEPageCommandHandler.prototype.get_pageCount, enumerable: true});
shetab.api.SEPageCommandHandler.prototype.get_pageViewCount = function ()
 {
    var ret = this.invokeGetProperty("pageViewCount", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.api.SEPageCommandHandler.prototype.set_pageViewCount = function (value)
 {
    this.invokeSetProperty("pageViewCount", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.api.SEPageCommandHandler.prototype, "pageViewCount", {get: shetab.api.SEPageCommandHandler.prototype.get_pageViewCount, set: shetab.api.SEPageCommandHandler.prototype.set_pageViewCount, enumerable: true});

shetab.api.SEPageCommandHandler.prototype.canSetPageViewCount = function (value)
 {
    var msg = (function ()
    {
        var $v22 = new shetab.SEMessage();
        $v22.methodName = "canSetPageViewCount";
        return $v22;
    }).call(this);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", (value === null) ? null : value.toString());
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.api.SEPageCommandHandler.prototype.getPageLabelFromPageNumber = function (value)
 {
    var msg = (function ()
    {
        var $v23 = new shetab.SEMessage();
        $v23.methodName = "getPageLabelFromPageNumber";
        return $v23;
    }).call(this);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", (value === null) ? null : value.toString());
    return this.invoke(msg);
};
shetab.api.SEPageCommandHandler.prototype.getPageNumberFromPageLabel = function (value)
 {
    var msg = (function ()
    {
        var $v24 = new shetab.SEMessage();
        $v24.methodName = "getPageNumberFromPageLabel";
        return $v24;
    }).call(this);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", value);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.api.SEPageCommandHandler.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SEPageCommandHandler, shetab.api.SEApiInvoker);
shetab.api.SEPrintCommandHandler = function ()
 {
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SEPrintCommandHandler.prototype.get_typeName = function ()
 {
    return "PrintCommandHandler";
};
Object.defineProperty(shetab.api.SEPrintCommandHandler.prototype, "typeName", {get: shetab.api.SEPrintCommandHandler.prototype.get_typeName, enumerable: true});
shetab.api.SEPrintCommandHandler.prototype.get_canPrint = function ()
 {
    var ret = this.invokeGetProperty("canPrint", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEPrintCommandHandler.prototype, "canPrint", {get: shetab.api.SEPrintCommandHandler.prototype.get_canPrint, enumerable: true});
shetab.api.SEPrintCommandHandler.prototype.get_canPrintPreview = function ()
 {
    var ret = this.invokeGetProperty("canPrintPreview", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEPrintCommandHandler.prototype, "canPrintPreview", {get: shetab.api.SEPrintCommandHandler.prototype.get_canPrintPreview, enumerable: true});
shetab.api.SEPrintCommandHandler.prototype.get_canPrintSetup = function ()
 {
    var ret = this.invokeGetProperty("canPrintSetup", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEPrintCommandHandler.prototype, "canPrintSetup", {get: shetab.api.SEPrintCommandHandler.prototype.get_canPrintSetup, enumerable: true});
shetab.api.SEPrintCommandHandler.prototype.print = function ()
 {
    var msg = (function ()
    {
        var $v25 = new shetab.SEMessage();
        $v25.methodName = "print";
        return $v25;
    }).call(this);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.api.SEPrintCommandHandler.prototype.printPreview = function ()
 {
    var msg = (function ()
    {
        var $v26 = new shetab.SEMessage();
        $v26.methodName = "printPreview";
        return $v26;
    }).call(this);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.api.SEPrintCommandHandler.prototype.printSetup = function ()
 {
    var msg = (function ()
    {
        var $v27 = new shetab.SEMessage();
        $v27.methodName = "printSetup";
        return $v27;
    }).call(this);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.api.SEPrintCommandHandler.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SEPrintCommandHandler, shetab.api.SEApiInvoker);
shetab.api.SETextCommandHandler = function ()
 {
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SETextCommandHandler.prototype.get_typeName = function ()
 {
    return "TextCommandHandler";
};
Object.defineProperty(shetab.api.SETextCommandHandler.prototype, "typeName", {get: shetab.api.SETextCommandHandler.prototype.get_typeName, enumerable: true});
shetab.api.SETextCommandHandler.prototype.get_selectedText = function ()
 {
    var ret = this.invokeGetProperty("selectedText", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SETextCommandHandler.prototype, "selectedText", {get: shetab.api.SETextCommandHandler.prototype.get_selectedText, enumerable: true});
shetab.api.SETextCommandHandler.prototype.get_canHighlightTexts = function ()
 {
    var ret = this.invokeGetProperty("canHighlightTexts", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SETextCommandHandler.prototype, "canHighlightTexts", {get: shetab.api.SETextCommandHandler.prototype.get_canHighlightTexts, enumerable: true});
shetab.api.SETextCommandHandler.prototype.highlightTexts = function (value)
 {
    var msg = (function ()
    {
        var $v28 = new shetab.SEMessage();
        $v28.methodName = "highlightTexts";
        return $v28;
    }).call(this);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", value);
    this.invoke(msg);
};
shetab.api.SETextCommandHandler.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SETextCommandHandler, shetab.api.SEApiInvoker);
shetab.api.SEZoomCommandHandler = function ()
 {
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SEZoomCommandHandler.prototype.get_typeName = function ()
 {
    return "ZoomCommandHandler";
};
Object.defineProperty(shetab.api.SEZoomCommandHandler.prototype, "typeName", {get: shetab.api.SEZoomCommandHandler.prototype.get_typeName, enumerable: true});
shetab.api.SEZoomCommandHandler.prototype.get_canZoomIn = function ()
 {
    var ret = this.invokeGetProperty("canZoomIn", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEZoomCommandHandler.prototype, "canZoomIn", {get: shetab.api.SEZoomCommandHandler.prototype.get_canZoomIn, enumerable: true});
shetab.api.SEZoomCommandHandler.prototype.get_canZoomOut = function ()
 {
    var ret = this.invokeGetProperty("canZoomOut", "");
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
Object.defineProperty(shetab.api.SEZoomCommandHandler.prototype, "canZoomOut", {get: shetab.api.SEZoomCommandHandler.prototype.get_canZoomOut, enumerable: true});
shetab.api.SEZoomCommandHandler.prototype.get_zoom = function ()
 {
    var ret = this.invokeGetProperty("zoom", "");
    return ret !== null ? shetab.common.Convert.toNumber(ret) : null;
};
shetab.api.SEZoomCommandHandler.prototype.set_zoom = function (value)
 {
    this.invokeSetProperty("zoom", (value === null) ? null : value.toString());
};
Object.defineProperty(shetab.api.SEZoomCommandHandler.prototype, "zoom", {get: shetab.api.SEZoomCommandHandler.prototype.get_zoom, set: shetab.api.SEZoomCommandHandler.prototype.set_zoom, enumerable: true});
shetab.api.SEZoomCommandHandler.prototype.get_zoomMode = function ()
 {

    return this.invokeGetProperty("zoomMode", "");
};
shetab.api.SEZoomCommandHandler.prototype.set_zoomMode = function (value)
 {
    this.invokeSetProperty("zoomMode", value);
};
Object.defineProperty(shetab.api.SEZoomCommandHandler.prototype, "zoomMode", {get: shetab.api.SEZoomCommandHandler.prototype.get_zoomMode, set: shetab.api.SEZoomCommandHandler.prototype.set_zoomMode, enumerable: true});
shetab.api.SEZoomCommandHandler.prototype.canSetZoomMode = function (value)
 {
    var msg = (function ()
    {
        var $v29 = new shetab.SEMessage();
        $v29.methodName = "canSetZoomMode";
        return $v29;
    }).call(this);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", value);
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.api.SEZoomCommandHandler.prototype.canSetZoom = function (value)
 {
    var msg = (function ()
    {
        var $v30 = new shetab.SEMessage();
        $v30.methodName = "canSetZoom";
        return $v30;
    }).call(this);
    if (shetab.common.Utility.isDefined(value))
        msg.setParam("value", (value === null) ? null : value.toString());
    var ret = this.invoke(msg);
    return ret !== null ? shetab.common.Convert.toBoolean(ret) : null;
};
shetab.api.SEZoomCommandHandler.prototype.zoomIn = function ()
 {
    var msg = (function ()
    {
        var $v31 = new shetab.SEMessage();
        $v31.methodName = "zoomIn";
        return $v31;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEZoomCommandHandler.prototype.zoomOut = function ()
 {
    var msg = (function ()
    {
        var $v32 = new shetab.SEMessage();
        $v32.methodName = "zoomOut";
        return $v32;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SEZoomCommandHandler.prototype.getAllCommandNames = function ()
 {
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SEZoomCommandHandler, shetab.api.SEApiInvoker);
shetab.api.SEPropertyBagItemProperty = function ()
 {
    this._itemId = null;
    this._moduleEntityId = null;
    this._propertySetId = null;
    this._propertyName = null;
};
shetab.api.SEPropertyBagItemProperty.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("itemId");
    info.addString("propertySetId");
    info.addString("moduleEntityId");
    info.addString("propertyName");
};
shetab.api.SEPropertyBagItemProperty.prototype.get_itemId = function ()
 {
    return this._itemId;
};
shetab.api.SEPropertyBagItemProperty.prototype.set_itemId = function (value)
 {
    this._itemId = value;
};
Object.defineProperty(shetab.api.SEPropertyBagItemProperty.prototype, "itemId", {get: shetab.api.SEPropertyBagItemProperty.prototype.get_itemId, set: shetab.api.SEPropertyBagItemProperty.prototype.set_itemId, enumerable: true});
shetab.api.SEPropertyBagItemProperty.prototype.get_moduleEntityId = function ()
 {
    return this._moduleEntityId;
};
shetab.api.SEPropertyBagItemProperty.prototype.set_moduleEntityId = function (value)
 {
    this._moduleEntityId = value;
};
Object.defineProperty(shetab.api.SEPropertyBagItemProperty.prototype, "moduleEntityId", {get: shetab.api.SEPropertyBagItemProperty.prototype.get_moduleEntityId, set: shetab.api.SEPropertyBagItemProperty.prototype.set_moduleEntityId, enumerable: true});
shetab.api.SEPropertyBagItemProperty.prototype.get_propertySetId = function ()
 {
    return this._propertySetId;
};
shetab.api.SEPropertyBagItemProperty.prototype.set_propertySetId = function (value)
 {
    this._propertySetId = value;
};
Object.defineProperty(shetab.api.SEPropertyBagItemProperty.prototype, "propertySetId", {get: shetab.api.SEPropertyBagItemProperty.prototype.get_propertySetId, set: shetab.api.SEPropertyBagItemProperty.prototype.set_propertySetId, enumerable: true});
shetab.api.SEPropertyBagItemProperty.prototype.get_propertyName = function ()
 {
    return this._propertyName;
};
shetab.api.SEPropertyBagItemProperty.prototype.set_propertyName = function (value)
 {
    this._propertyName = value;
};
Object.defineProperty(shetab.api.SEPropertyBagItemProperty.prototype, "propertyName", {get: shetab.api.SEPropertyBagItemProperty.prototype.get_propertyName, set: shetab.api.SEPropertyBagItemProperty.prototype.set_propertyName, enumerable: true});
shetab.api.SEBook = function ()
 {
};
shetab.api.SECore = function (message)
 {
    this._message = null;
    this.set_message(message);
};
shetab.api.SECore.prototype.get_message = function ()
 {
    return this._message;
};
shetab.api.SECore.prototype.set_message = function (value)
 {
    this._message = value;
};
Object.defineProperty(shetab.api.SECore.prototype, "message", {get: shetab.api.SECore.prototype.get_message, set: shetab.api.SECore.prototype.set_message, enumerable: true});
shetab.api.SECore.prototype.get_mute = function ()
 {
    return shetab.SEEngine.get_current().get_options().get_mute();
};
shetab.api.SECore.prototype.set_mute = function (value)
 {
    shetab.SEEngine.get_current().get_options().set_mute(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "mute", {get: shetab.api.SECore.prototype.get_mute, set: shetab.api.SECore.prototype.set_mute, enumerable: true});
shetab.api.SECore.prototype.get_navigationPanelLock = function ()
 {
    return shetab.SEEngine.get_current().get_options().get_navigationPanelLock();
};
shetab.api.SECore.prototype.set_navigationPanelLock = function (value)
 {
    shetab.SEEngine.get_current().get_options().set_navigationPanelLock(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "navigationPanelLock", {get: shetab.api.SECore.prototype.get_navigationPanelLock, set: shetab.api.SECore.prototype.set_navigationPanelLock, enumerable: true});
shetab.api.SECore.prototype.get_navigationPanelVisible = function ()
 {
    return shetab.SEEngine.get_current().get_options().get_navigationPanelVisible();
};
shetab.api.SECore.prototype.set_navigationPanelVisible = function (value)
 {
    shetab.SEEngine.get_current().get_options().set_navigationPanelVisible(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "navigationPanelVisible", {get: shetab.api.SECore.prototype.get_navigationPanelVisible, set: shetab.api.SECore.prototype.set_navigationPanelVisible, enumerable: true});
shetab.api.SECore.prototype.get_navigationPanelAutoHide = function ()
 {
    return shetab.SEEngine.get_current().get_options().get_navigationPanelAutoHide();
};
shetab.api.SECore.prototype.set_navigationPanelAutoHide = function (value)
 {
    shetab.SEEngine.get_current().get_options().set_navigationPanelAutoHide(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "navigationPanelAutoHide", {get: shetab.api.SECore.prototype.get_navigationPanelAutoHide, set: shetab.api.SECore.prototype.set_navigationPanelAutoHide, enumerable: true});
shetab.api.SECore.prototype.get_navigationPanelWidth = function ()
 {
    return shetab.SEEngine.get_current().get_options().get_navigationPanelWidth();
};
shetab.api.SECore.prototype.set_navigationPanelWidth = function (value)
 {
    shetab.SEEngine.get_current().get_options().set_navigationPanelWidth(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "navigationPanelWidth", {get: shetab.api.SECore.prototype.get_navigationPanelWidth, set: shetab.api.SECore.prototype.set_navigationPanelWidth, enumerable: true});
shetab.api.SECore.prototype.get_isDiagnosticsInfoEnabled = function ()
 {
    return shetab.SEEngine.get_current().get_options().get_isDiagnosticsInfoEnabled();
};
shetab.api.SECore.prototype.set_isDiagnosticsInfoEnabled = function (value)
 {
    shetab.SEEngine.get_current().get_options().set_isDiagnosticsInfoEnabled(value);
};

Object.defineProperty(shetab.api.SECore.prototype, "isDiagnosticsInfoEnabled", {get: shetab.api.SECore.prototype.get_isDiagnosticsInfoEnabled, set: shetab.api.SECore.prototype.set_isDiagnosticsInfoEnabled, enumerable: true});
shetab.api.SECore.prototype.get_soundVolume = function ()
 {
    return shetab.SEEngine.get_current().get_options().get_soundVolume();
};
shetab.api.SECore.prototype.set_soundVolume = function (value)
 {
    shetab.SEEngine.get_current().get_options().set_soundVolume(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "soundVolume", {get: shetab.api.SECore.prototype.get_soundVolume, set: shetab.api.SECore.prototype.set_soundVolume, enumerable: true});
shetab.api.SECore.prototype.canExecuteCommand = function (commandName)
 {
    return shetab.SEEngine.get_current().canExecuteCommand(commandName);
};
shetab.api.SECore.prototype.canGetProperty = function (propertyName)
 {
    return shetab.SEEngine.get_current().canGetCoreProperty(propertyName);
};
shetab.api.SECore.prototype.canSetProperty = function (propertyName, value)
 {
    return shetab.SEEngine.get_current().canSetCoreProperty(propertyName, value);
};
shetab.api.SECore.prototype.executeCommand = function (commandName)
 {
    shetab.SEEngine.get_current().executeCommand(commandName);
};
shetab.api.SECore.prototype.get_isDesignMode = function ()
 {
    return shetab.SEEngine.get_current().get_isDesignMode();
};
Object.defineProperty(shetab.api.SECore.prototype, "isDesignMode", {get: shetab.api.SECore.prototype.get_isDesignMode, enumerable: true});
shetab.api.SECore.prototype.exportFiles = function (links)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.findTopic = function (startTopicId, topicId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getCommandStatus = function (commandName, checkedState)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getCustomProperty = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getPromptColor = function (initColor)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getPromptFileOpen = function (fileName, filter)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getPromptFolder = function (initFolder, rootFolder, title)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getPromptFont = function (initFont)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getResource = function (resourceFile, resourceKey)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getTopic = function (topicId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getTopicIdBookOwner = function (topicId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.index = function (queryString, locateIndex)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.navigateDocument = function (link, useRecentSound, highlightKeywords)
 {
    shetab.SEEngine.get_current().moduleManager.openDocument(link, null , null , "mainView", true);
};
shetab.api.SECore.prototype.navigatePageLabel = function (label)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.openUrl = function (url, parameters)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.playSound = function (link, backgroundMode, loopSound)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.printFiles = function (links)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.search = function (queryString, startIndex, resultCount)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.sendCustomNotify = function (customNotifyName, customNotifyValue)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.setCustomProperty = function (propertyName, value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.setProperty = function (propertyName, propertyValue)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.localizeText = function (text)
 {
    return shetab.SEEngine.get_current().localizeText$$String(text);
};
shetab.api.SECore.prototype.get_books = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "books", {get: shetab.api.SECore.prototype.get_books, enumerable: true});
shetab.api.SECore.prototype.get_commentAuthor = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_commentAuthor = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "commentAuthor", {get: shetab.api.SECore.prototype.get_commentAuthor, set: shetab.api.SECore.prototype.set_commentAuthor, enumerable: true});
shetab.api.SECore.prototype.get_commentSubject = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_commentSubject = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "commentSubject", {get: shetab.api.SECore.prototype.get_commentSubject, set: shetab.api.SECore.prototype.set_commentSubject, enumerable: true});
shetab.api.SECore.prototype.get_commentText = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_commentText = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "commentText", {get: shetab.api.SECore.prototype.get_commentText, set: shetab.api.SECore.prototype.set_commentText, enumerable: true});
shetab.api.SECore.prototype.get_commentTime = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_commentTime = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "commentTime", {get: shetab.api.SECore.prototype.get_commentTime, set: shetab.api.SECore.prototype.set_commentTime, enumerable: true});
shetab.api.SECore.prototype.get_commentWindowVisible = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_commentWindowVisible = function (value)
 {

    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "commentWindowVisible", {get: shetab.api.SECore.prototype.get_commentWindowVisible, set: shetab.api.SECore.prototype.set_commentWindowVisible, enumerable: true});
shetab.api.SECore.prototype.set_contentsRoot = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "contentsRoot", {set: shetab.api.SECore.prototype.set_contentsRoot, enumerable: true});
shetab.api.SECore.prototype.get_contentsViewLink = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_contentsViewLink = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "contentsViewLink", {get: shetab.api.SECore.prototype.get_contentsViewLink, set: shetab.api.SECore.prototype.set_contentsViewLink, enumerable: true});
shetab.api.SECore.prototype.get_currentRootTopicId = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_currentRootTopicId = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "currentRootTopicId", {get: shetab.api.SECore.prototype.get_currentRootTopicId, set: shetab.api.SECore.prototype.set_currentRootTopicId, enumerable: true});
shetab.api.SECore.prototype.get_currentTopicId = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_currentTopicId = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "currentTopicId", {get: shetab.api.SECore.prototype.get_currentTopicId, set: shetab.api.SECore.prototype.set_currentTopicId, enumerable: true});
shetab.api.SECore.prototype.get_defaultContentsViewLink = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_defaultContentsViewLink = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "defaultContentsViewLink", {get: shetab.api.SECore.prototype.get_defaultContentsViewLink, set: shetab.api.SECore.prototype.set_defaultContentsViewLink, enumerable: true});
shetab.api.SECore.prototype.get_documentFile = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "documentFile", {get: shetab.api.SECore.prototype.get_documentFile, enumerable: true});
shetab.api.SECore.prototype.get_documentLink = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_documentLink = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "documentLink", {get: shetab.api.SECore.prototype.get_documentLink, set: shetab.api.SECore.prototype.set_documentLink, enumerable: true});
shetab.api.SECore.prototype.get_enableFocus = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_enableFocus = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "enableFocus", {get: shetab.api.SECore.prototype.get_enableFocus, set: shetab.api.SECore.prototype.set_enableFocus, enumerable: true});
shetab.api.SECore.prototype.get_enableUpdateView = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_enableUpdateView = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "enableUpdateView", {get: shetab.api.SECore.prototype.get_enableUpdateView, set: shetab.api.SECore.prototype.set_enableUpdateView, enumerable: true});
shetab.api.SECore.prototype.get_flowDirection = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "flowDirection", {get: shetab.api.SECore.prototype.get_flowDirection, enumerable: true});
shetab.api.SECore.prototype.get_fullScreen = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_fullScreen = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "fullScreen", {get: shetab.api.SECore.prototype.get_fullScreen, set: shetab.api.SECore.prototype.set_fullScreen, enumerable: true});
shetab.api.SECore.prototype.get_fullView = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_fullView = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "fullView", {get: shetab.api.SECore.prototype.get_fullView, set: shetab.api.SECore.prototype.set_fullView, enumerable: true});
shetab.api.SECore.prototype.get_highlightSearch = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_highlightSearch = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "highlightSearch", {get: shetab.api.SECore.prototype.get_highlightSearch, set: shetab.api.SECore.prototype.set_highlightSearch, enumerable: true});
shetab.api.SECore.prototype.get_isCommentAuthorEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isCommentAuthorEnabled", {get: shetab.api.SECore.prototype.get_isCommentAuthorEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isCommentSubjectEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isCommentSubjectEnabled", {get: shetab.api.SECore.prototype.get_isCommentSubjectEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isCommentTextEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isCommentTextEnabled", {get: shetab.api.SECore.prototype.get_isCommentTextEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isCommentTimeEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isCommentTimeEnabled", {get: shetab.api.SECore.prototype.get_isCommentTimeEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isEffect3DAvailable = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};

Object.defineProperty(shetab.api.SECore.prototype, "isEffect3DAvailable", {get: shetab.api.SECore.prototype.get_isEffect3DAvailable, enumerable: true});
shetab.api.SECore.prototype.get_isEffect3DEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_isEffect3DEnabled = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isEffect3DEnabled", {get: shetab.api.SECore.prototype.get_isEffect3DEnabled, set: shetab.api.SECore.prototype.set_isEffect3DEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isMediaOpen = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isMediaOpen", {get: shetab.api.SECore.prototype.get_isMediaOpen, enumerable: true});
shetab.api.SECore.prototype.get_isMediaPaused = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isMediaPaused", {get: shetab.api.SECore.prototype.get_isMediaPaused, enumerable: true});
shetab.api.SECore.prototype.get_isMediaPlaying = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_isMediaPlaying = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isMediaPlaying", {get: shetab.api.SECore.prototype.get_isMediaPlaying, set: shetab.api.SECore.prototype.set_isMediaPlaying, enumerable: true});
shetab.api.SECore.prototype.get_isMediaStopped = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isMediaStopped", {get: shetab.api.SECore.prototype.get_isMediaStopped, enumerable: true});
shetab.api.SECore.prototype.get_isPageCountEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isPageCountEnabled", {get: shetab.api.SECore.prototype.get_isPageCountEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isPageLabelEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isPageLabelEnabled", {get: shetab.api.SECore.prototype.get_isPageLabelEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isSearchQueryEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isSearchQueryEnabled", {get: shetab.api.SECore.prototype.get_isSearchQueryEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isShetabEbookHost = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isShetabEbookHost", {get: shetab.api.SECore.prototype.get_isShetabEbookHost, enumerable: true});
shetab.api.SECore.prototype.get_isShortcutMenuEnabled = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_isShortcutMenuEnabled = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "isShortcutMenuEnabled", {get: shetab.api.SECore.prototype.get_isShortcutMenuEnabled, set: shetab.api.SECore.prototype.set_isShortcutMenuEnabled, enumerable: true});
shetab.api.SECore.prototype.get_markupWindowVisible = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_markupWindowVisible = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "markupWindowVisible", {get: shetab.api.SECore.prototype.get_markupWindowVisible, set: shetab.api.SECore.prototype.set_markupWindowVisible, enumerable: true});
shetab.api.SECore.prototype.get_maxSize = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_maxSize = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "maxSize", {get: shetab.api.SECore.prototype.get_maxSize, set: shetab.api.SECore.prototype.set_maxSize, enumerable: true});
shetab.api.SECore.prototype.get_mediaLength = function ()
 {
    return shetab.SEEngine.get_current().get_mediaLength();
};
Object.defineProperty(shetab.api.SECore.prototype, "mediaLength", {get: shetab.api.SECore.prototype.get_mediaLength, enumerable: true});
shetab.api.SECore.prototype.get_mediaPosition = function ()
 {
    return shetab.SEEngine.get_current().get_mediaPosition();
};
shetab.api.SECore.prototype.set_mediaPosition = function (value)
 {
    shetab.SEEngine.get_current().set_mediaPosition(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "mediaPosition", {get: shetab.api.SECore.prototype.get_mediaPosition, set: shetab.api.SECore.prototype.set_mediaPosition, enumerable: true});
shetab.api.SECore.prototype.get_mediaState = function ()
 {
    return shetab.SEEngine.get_current().get_mediaState();
};
shetab.api.SECore.prototype.set_mediaState = function (value)
 {
    shetab.SEEngine.get_current().set_mediaState(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "mediaState", {get: shetab.api.SECore.prototype.get_mediaState, set: shetab.api.SECore.prototype.set_mediaState, enumerable: true});
shetab.api.SECore.prototype.get_mediaPositionGrabMode = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_mediaPositionGrabMode = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "mediaPositionGrabMode", {get: shetab.api.SECore.prototype.get_mediaPositionGrabMode, set: shetab.api.SECore.prototype.set_mediaPositionGrabMode, enumerable: true});
shetab.api.SECore.prototype.get_minSize = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_minSize = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "minSize", {get: shetab.api.SECore.prototype.get_minSize, set: shetab.api.SECore.prototype.set_minSize, enumerable: true});
shetab.api.SECore.prototype.get_moduleFile = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "moduleFile", {get: shetab.api.SECore.prototype.get_moduleFile, enumerable: true});
shetab.api.SECore.prototype.get_moduleFolder = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "moduleFolder", {get: shetab.api.SECore.prototype.get_moduleFolder, enumerable: true});
shetab.api.SECore.prototype.get_pageCount = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};

Object.defineProperty(shetab.api.SECore.prototype, "pageCount", {get: shetab.api.SECore.prototype.get_pageCount, enumerable: true});
shetab.api.SECore.prototype.get_pageDisplay = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_pageDisplay = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "pageDisplay", {get: shetab.api.SECore.prototype.get_pageDisplay, set: shetab.api.SECore.prototype.set_pageDisplay, enumerable: true});
shetab.api.SECore.prototype.get_pageLabel = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_pageLabel = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "pageLabel", {get: shetab.api.SECore.prototype.get_pageLabel, set: shetab.api.SECore.prototype.set_pageLabel, enumerable: true});
shetab.api.SECore.prototype.get_plugins = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "plugins", {get: shetab.api.SECore.prototype.get_plugins, enumerable: true});
shetab.api.SECore.prototype.get_position = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_position = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "position", {get: shetab.api.SECore.prototype.get_position, set: shetab.api.SECore.prototype.set_position, enumerable: true});
shetab.api.SECore.prototype.get_productCompanyName = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "productCompanyName", {get: shetab.api.SECore.prototype.get_productCompanyName, enumerable: true});
shetab.api.SECore.prototype.get_productCopyright = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "productCopyright", {get: shetab.api.SECore.prototype.get_productCopyright, enumerable: true});
shetab.api.SECore.prototype.get_productCulture = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_productCulture = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "productCulture", {get: shetab.api.SECore.prototype.get_productCulture, set: shetab.api.SECore.prototype.set_productCulture, enumerable: true});
shetab.api.SECore.prototype.get_productName = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "productName", {get: shetab.api.SECore.prototype.get_productName, enumerable: true});
shetab.api.SECore.prototype.get_productSupportEmail = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "productSupportEmail", {get: shetab.api.SECore.prototype.get_productSupportEmail, enumerable: true});
shetab.api.SECore.prototype.get_productSupportPhone = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "productSupportPhone", {get: shetab.api.SECore.prototype.get_productSupportPhone, enumerable: true});
shetab.api.SECore.prototype.get_productSupportUrl = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "productSupportUrl", {get: shetab.api.SECore.prototype.get_productSupportUrl, enumerable: true});
shetab.api.SECore.prototype.get_productVersion = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "productVersion", {get: shetab.api.SECore.prototype.get_productVersion, enumerable: true});
shetab.api.SECore.prototype.get_projectBooksFolder = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "projectBooksFolder", {get: shetab.api.SECore.prototype.get_projectBooksFolder, enumerable: true});
shetab.api.SECore.prototype.get_projectUrl = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_projectUrl = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "projectUrl", {get: shetab.api.SECore.prototype.get_projectUrl, set: shetab.api.SECore.prototype.set_projectUrl, enumerable: true});
shetab.api.SECore.prototype.get_readerSkins = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_readerSkins = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "readerSkins", {get: shetab.api.SECore.prototype.get_readerSkins, set: shetab.api.SECore.prototype.set_readerSkins, enumerable: true});
shetab.api.SECore.prototype.get_rootBookId = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_rootBookId = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "rootBookId", {get: shetab.api.SECore.prototype.get_rootBookId, set: shetab.api.SECore.prototype.set_rootBookId, enumerable: true});
shetab.api.SECore.prototype.get_searchQuery = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_searchQuery = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "searchQuery", {get: shetab.api.SECore.prototype.get_searchQuery, set: shetab.api.SECore.prototype.set_searchQuery, enumerable: true});
shetab.api.SECore.prototype.get_selectedBookId = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "selectedBookId", {get: shetab.api.SECore.prototype.get_selectedBookId, enumerable: true});
shetab.api.SECore.prototype.get_selectedTopicId = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "selectedTopicId", {get: shetab.api.SECore.prototype.get_selectedTopicId, enumerable: true});
shetab.api.SECore.prototype.get_shetabReaderVersion = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "shetabReaderVersion", {get: shetab.api.SECore.prototype.get_shetabReaderVersion, enumerable: true});
shetab.api.SECore.prototype.get_shetabWebSiteUrl = function ()
 {

    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "shetabWebSiteUrl", {get: shetab.api.SECore.prototype.get_shetabWebSiteUrl, enumerable: true});
shetab.api.SECore.prototype.get_showAboutEngineMenu = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_showAboutEngineMenu = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "showAboutEngineMenu", {get: shetab.api.SECore.prototype.get_showAboutEngineMenu, set: shetab.api.SECore.prototype.set_showAboutEngineMenu, enumerable: true});
shetab.api.SECore.prototype.get_size = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_size = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "size", {get: shetab.api.SECore.prototype.get_size, set: shetab.api.SECore.prototype.set_size, enumerable: true});
shetab.api.SECore.prototype.get_skinAutoZoom = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_skinAutoZoom = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "skinAutoZoom", {get: shetab.api.SECore.prototype.get_skinAutoZoom, set: shetab.api.SECore.prototype.set_skinAutoZoom, enumerable: true});
shetab.api.SECore.prototype.get_skinClientLocation = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_skinClientLocation = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "skinClientLocation", {get: shetab.api.SECore.prototype.get_skinClientLocation, set: shetab.api.SECore.prototype.set_skinClientLocation, enumerable: true});
shetab.api.SECore.prototype.get_skinClientSize = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_skinClientSize = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "skinClientSize", {get: shetab.api.SECore.prototype.get_skinClientSize, set: shetab.api.SECore.prototype.set_skinClientSize, enumerable: true});
shetab.api.SECore.prototype.get_skinClientVisible = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_skinClientVisible = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "skinClientVisible", {get: shetab.api.SECore.prototype.get_skinClientVisible, set: shetab.api.SECore.prototype.set_skinClientVisible, enumerable: true});
shetab.api.SECore.prototype.get_skinDesignSize = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_skinDesignSize = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "skinDesignSize", {get: shetab.api.SECore.prototype.get_skinDesignSize, set: shetab.api.SECore.prototype.set_skinDesignSize, enumerable: true});
shetab.api.SECore.prototype.get_skinFile = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_skinFile = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "skinFile", {get: shetab.api.SECore.prototype.get_skinFile, set: shetab.api.SECore.prototype.set_skinFile, enumerable: true});
shetab.api.SECore.prototype.get_skinId = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_skinId = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "skinId", {get: shetab.api.SECore.prototype.get_skinId, set: shetab.api.SECore.prototype.set_skinId, enumerable: true});
shetab.api.SECore.prototype.get_skinVisible = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_skinVisible = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "skinVisible", {get: shetab.api.SECore.prototype.get_skinVisible, set: shetab.api.SECore.prototype.set_skinVisible, enumerable: true});
shetab.api.SECore.prototype.get_topics = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "topics", {get: shetab.api.SECore.prototype.get_topics, enumerable: true});
shetab.api.SECore.prototype.get_uiCulture = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_uiCulture = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "uiCulture", {get: shetab.api.SECore.prototype.get_uiCulture, set: shetab.api.SECore.prototype.set_uiCulture, enumerable: true});
shetab.api.SECore.prototype.get_uiFlowDirection = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "uiFlowDirection", {get: shetab.api.SECore.prototype.get_uiFlowDirection, enumerable: true});
shetab.api.SECore.prototype.get_viewSize = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "viewSize", {get: shetab.api.SECore.prototype.get_viewSize, enumerable: true});
shetab.api.SECore.prototype.get_visible = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_visible = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "visible", {get: shetab.api.SECore.prototype.get_visible, set: shetab.api.SECore.prototype.set_visible, enumerable: true});
shetab.api.SECore.prototype.get_windowState = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.set_windowState = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "windowState", {get: shetab.api.SECore.prototype.get_windowState, set: shetab.api.SECore.prototype.set_windowState, enumerable: true});
shetab.api.SECore.prototype.get_zoomMode = function ()
 {
    return shetab.SEEngine.get_current().get_zoomMode();
};
shetab.api.SECore.prototype.set_zoomMode = function (value)
 {
    shetab.SEEngine.get_current().set_zoomMode(value);
};

Object.defineProperty(shetab.api.SECore.prototype, "zoomMode", {get: shetab.api.SECore.prototype.get_zoomMode, set: shetab.api.SECore.prototype.set_zoomMode, enumerable: true});
shetab.api.SECore.prototype.get_zoom = function ()
 {
    return shetab.SEEngine.get_current().get_zoom();
};
shetab.api.SECore.prototype.set_zoom = function (value)
 {
    shetab.SEEngine.get_current().set_zoom(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "zoom", {get: shetab.api.SECore.prototype.get_zoom, set: shetab.api.SECore.prototype.set_zoom, enumerable: true});
shetab.api.SECore.prototype.get_documentUrl = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECore.prototype, "documentUrl", {get: shetab.api.SECore.prototype.get_documentUrl, enumerable: true});
shetab.api.SECore.prototype.getDocumentInfoByLink = function (link)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getLinkFromUrl = function (link)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getUrlFromLink = function (link)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.getDocumentInfoByUrl = function (url)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECore.prototype.get_localStorage = function ()
 {
    throw new Error("localStorage should not call directly!");
};
Object.defineProperty(shetab.api.SECore.prototype, "localStorage", {get: shetab.api.SECore.prototype.get_localStorage, enumerable: true});
shetab.api.SECore.prototype.get_moduleEntityStorage = function ()
 {
    throw new Error("moduleEntityStorage should not call directly!");
};
Object.defineProperty(shetab.api.SECore.prototype, "moduleEntityStorage", {get: shetab.api.SECore.prototype.get_moduleEntityStorage, enumerable: true});
shetab.api.SECore.prototype.get_moduleStorage = function ()
 {
    throw new Error("moduleStorage should not call directly!");
};
Object.defineProperty(shetab.api.SECore.prototype, "moduleStorage", {get: shetab.api.SECore.prototype.get_moduleStorage, enumerable: true});
shetab.api.SECore.prototype.get_projectStorage = function ()
 {
    throw new Error("projectStorage should not call directly!");
};
Object.defineProperty(shetab.api.SECore.prototype, "projectStorage", {get: shetab.api.SECore.prototype.get_projectStorage, enumerable: true});
shetab.api.SECore.prototype.get_sessionStorage = function ()
 {
    throw new Error("sessionStorage should not call directly!");
};
Object.defineProperty(shetab.api.SECore.prototype, "sessionStorage", {get: shetab.api.SECore.prototype.get_sessionStorage, enumerable: true});
shetab.api.SECore.prototype.get_propertyBag = function ()
 {
    throw new Error("propertyBag should not call directly!");
};
Object.defineProperty(shetab.api.SECore.prototype, "propertyBag", {get: shetab.api.SECore.prototype.get_propertyBag, enumerable: true});
shetab.api.SECore.prototype.get_moduleInstanceId = function ()
 {
    throw new Error("moduleInstanceId should not call directly!");
};
Object.defineProperty(shetab.api.SECore.prototype, "moduleInstanceId", {get: shetab.api.SECore.prototype.get_moduleInstanceId, enumerable: true});
shetab.api.SECore.prototype.get_isExternalPropertyBagNotificationEnabled = function ()
 {
    throw new Error("isExternalPropertyBagNotificationEnabled should not call directly!");
};
shetab.api.SECore.prototype.set_isExternalPropertyBagNotificationEnabled = function (value)
 {
    throw new Error("isExternalPropertyBagNotificationEnabled should not call directly!");
};
Object.defineProperty(shetab.api.SECore.prototype, "isExternalPropertyBagNotificationEnabled", {get: shetab.api.SECore.prototype.get_isExternalPropertyBagNotificationEnabled, set: shetab.api.SECore.prototype.set_isExternalPropertyBagNotificationEnabled, enumerable: true});
shetab.api.SECore.prototype.get_isActiveModule = function ()
 {
    return shetab.SEEngine.get_current().moduleManager.isActiveModuleInstance(this.get_message().callerInstanceId);
};
Object.defineProperty(shetab.api.SECore.prototype, "isActiveModule", {get: shetab.api.SECore.prototype.get_isActiveModule, enumerable: true});
shetab.api.SECore.prototype.get_isContainsActiveModule = function ()
 {
    return shetab.SEEngine.get_current().moduleManager.isContainsActiveModule(this.get_message().callerInstanceId);
};
Object.defineProperty(shetab.api.SECore.prototype, "isContainsActiveModule", {get: shetab.api.SECore.prototype.get_isContainsActiveModule, enumerable: true});
shetab.api.SECore.prototype.setSelectedItem = function (itemId, propertySetId)
 {
    this.set_selectedItem((function ()
    {
        var $v33 = new shetab.api.SESelectedItem();
        $v33.set_itemId(itemId);
        $v33.set_propertySetId(propertySetId);
        return $v33;
    }).call(this));
};
shetab.api.SECore.prototype.get_selectedItem = function ()
 {
    return shetab.SEEngine.get_current().moduleManager.get_activeModuleInstance() !== null ? shetab.SEEngine.get_current().moduleManager.get_activeModuleInstance().get_selectedItem() : null;
};
shetab.api.SECore.prototype.set_selectedItem = function (value)
 {
    shetab.SEEngine.get_current().moduleManager.getModuleInstanceById(this.get_message().callerInstanceId).set_selectedItems( [value]);
};
Object.defineProperty(shetab.api.SECore.prototype, "selectedItem", {get: shetab.api.SECore.prototype.get_selectedItem, set: shetab.api.SECore.prototype.set_selectedItem, enumerable: true});
shetab.api.SECore.prototype.get_selectedItems = function ()
 {
    return shetab.SEEngine.get_current().moduleManager.get_activeModuleInstance() !== null ? shetab.SEEngine.get_current().moduleManager.get_activeModuleInstance().get_selectedItems() : null;
};
shetab.api.SECore.prototype.set_selectedItems = function (value)
 {
    shetab.SEEngine.get_current().moduleManager.getModuleInstanceById(this.get_message().callerInstanceId).set_selectedItems(value);
};
Object.defineProperty(shetab.api.SECore.prototype, "selectedItems", {get: shetab.api.SECore.prototype.get_selectedItems, set: shetab.api.SECore.prototype.set_selectedItems, enumerable: true});
shetab.api.SECore.prototype.getPropertyBag = function (moduleEntityId, doneCallback)
 {
    var moduleInstance = shetab.SEEngine.get_current().moduleManager.getModuleInstanceById(this.get_message().callerInstanceId);
    var propBag = shetab.SEEngine.get_current().moduleManager.getPropertyBagFromLoadedModuleEntities(moduleEntityId, moduleInstance);
    if (propBag !== null)
    {
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK"));
        return;
    }
    shetab.SEEngine.get_current().moduleManager.loadModuleEntityById(moduleEntityId, moduleInstance, $CreateAnonymousDelegate(this, function (moduleEntity)
    {
        doneCallback(new shetab.api.StorageCallbackParam(moduleEntity !== null , moduleEntity !== null ? "OK" : "Could not load moduleEntityId!"));
    }));
};
shetab.api.SECore.prototype.get_moduleEntityId = function ()
 {
    var moduleInstance = shetab.SEEngine.get_current().moduleManager.getModuleInstanceById(this.get_message().callerInstanceId);
    return moduleInstance.moduleEntity !== null ? moduleInstance.moduleEntity.get_id() : null;
};
Object.defineProperty(shetab.api.SECore.prototype, "moduleEntityId", {get: shetab.api.SECore.prototype.get_moduleEntityId, enumerable: true});
shetab.api.SECore.prototype.get_canActive = function ()
 {
    return shetab.SEEngine.get_current().moduleManager.getModuleInstanceById(this.get_message().callerInstanceId).canActive;
};
shetab.api.SECore.prototype.set_canActive = function (value)
 {

    shetab.SEEngine.get_current().moduleManager.getModuleInstanceById(this.get_message().callerInstanceId).canActive = value;
};
Object.defineProperty(shetab.api.SECore.prototype, "canActive", {get: shetab.api.SECore.prototype.get_canActive, set: shetab.api.SECore.prototype.set_canActive, enumerable: true});
shetab.api.SECore.prototype.get_isTestMode = function ()
 {
    return false;
};
Object.defineProperty(shetab.api.SECore.prototype, "isTestMode", {get: shetab.api.SECore.prototype.get_isTestMode, enumerable: true});
shetab.api.SEDocumentInfo = function ()
 {
    this._link = null;
    this._playerUrl = null;
    this._poolName = null;
    this._url = null;
};
shetab.api.SEDocumentInfo.prototype.get_link = function ()
 {
    return this._link;
};
shetab.api.SEDocumentInfo.prototype.set_link = function (value)
 {
    this._link = value;
};
Object.defineProperty(shetab.api.SEDocumentInfo.prototype, "link", {get: shetab.api.SEDocumentInfo.prototype.get_link, set: shetab.api.SEDocumentInfo.prototype.set_link, enumerable: true});
shetab.api.SEDocumentInfo.prototype.get_playerUrl = function ()
 {
    return this._playerUrl;
};
shetab.api.SEDocumentInfo.prototype.set_playerUrl = function (value)
 {
    this._playerUrl = value;
};
Object.defineProperty(shetab.api.SEDocumentInfo.prototype, "playerUrl", {get: shetab.api.SEDocumentInfo.prototype.get_playerUrl, set: shetab.api.SEDocumentInfo.prototype.set_playerUrl, enumerable: true});
shetab.api.SEDocumentInfo.prototype.get_poolName = function ()
 {
    return this._poolName;
};
shetab.api.SEDocumentInfo.prototype.set_poolName = function (value)
 {
    this._poolName = value;
};
Object.defineProperty(shetab.api.SEDocumentInfo.prototype, "poolName", {get: shetab.api.SEDocumentInfo.prototype.get_poolName, set: shetab.api.SEDocumentInfo.prototype.set_poolName, enumerable: true});
shetab.api.SEDocumentInfo.prototype.get_url = function ()
 {
    return this._url;
};
shetab.api.SEDocumentInfo.prototype.set_url = function (value)
 {
    this._url = value;
};
Object.defineProperty(shetab.api.SEDocumentInfo.prototype, "url", {get: shetab.api.SEDocumentInfo.prototype.get_url, set: shetab.api.SEDocumentInfo.prototype.set_url, enumerable: true});
shetab.api.SEDocumentInfo.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("link");
    info.addString("url");
    info.addString("playerUrl");
    info.addString("poolName");
};
shetab.api.SEIconSet = function ()
 {
};
shetab.api.SEInternalCore = function (message)
 {
    this._message = null;
    this.set_message(message);
};
shetab.api.SEInternalCore.prototype.get_message = function ()
 {
    return this._message;
};
shetab.api.SEInternalCore.prototype.set_message = function (value)
 {
    this._message = value;
};
Object.defineProperty(shetab.api.SEInternalCore.prototype, "message", {get: shetab.api.SEInternalCore.prototype.get_message, set: shetab.api.SEInternalCore.prototype.set_message, enumerable: true});
shetab.api.SEInternalCore.prototype.addModulePlaceholder = function (modulePlaceholderId)
 {
    shetab.SEEngine.get_current().moduleManager.addModulePlaceholder(modulePlaceholderId);
};
shetab.api.SEInternalCore.prototype.convertDeprecatedToken = function (tokenName)
 {
    return "";
};
shetab.api.SEInternalCore.prototype.executeCommand = function (commandName)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SEInternalCore.prototype.getProperty = function (propertyName, testValue)
 {
    throw new Error("getProperty should not call directly!");
};
shetab.api.SEInternalCore.prototype.setProperty = function (propertyName, propertyValue)
 {
    throw new Error("setProperty should not call directly!");
};
shetab.api.SEInternalCore.prototype.initializeModule = function (agentVersion, url, parentInstanceId, placeholderId, sessionName)
 {
    return shetab.SEEngine.get_current().moduleManager.initializeModule(agentVersion, url, parentInstanceId, placeholderId, sessionName);
};
shetab.api.SEInternalCore.prototype.initializeCommandHandler = function (interfaces)
 {
    shetab.SEEngine.get_current().moduleManager.initializeCommandHandler(this.get_message().callerInstanceId, interfaces);
};
shetab.api.SEInternalCore.prototype.getModulePropertiesXml = function (itemId, propertySetId, moduleEntityId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SEInternalCore.prototype.getModulePropertyXml = function (propertyName, itemId, propertySetId, moduleEntityId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SEInternalCore.prototype.activateModule = function (value)
 {
    shetab.SEEngine.get_current().moduleManager.activateModule(this.get_message().callerInstanceId, value);
};
shetab.api.SEInternalCore.prototype.get_selectedItemsXml = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SEInternalCore.prototype.set_selectedItemsXml = function (value)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SEInternalCore.prototype, "selectedItemsXml", {get: shetab.api.SEInternalCore.prototype.get_selectedItemsXml, set: shetab.api.SEInternalCore.prototype.set_selectedItemsXml, enumerable: true});
shetab.api.SEInternalCore.prototype.uninitializeModule = function ()
 {
    shetab.SEEngine.get_current().moduleManager.uninitializeModule(this.get_message().callerInstanceId);
};
shetab.api.SEInternalCore.prototype.getPropertyBagChangeSet = function (changeSetId, moduleEntityId)
 {
    return shetab.SEEngine.get_current().getPropertyBagChangedSet(changeSetId, moduleEntityId);
};
shetab.api.SEMessageParser = function ()
 {
};
shetab.api.SEMessageParser.c_unhandled = "$$unhandled";
shetab.api.SEMessageParser.c_undefined = "$$undefined";
shetab.api.SEMessageParser.c_error = "$$error";
shetab.api.SEMessageParser.c_null = "$$null";
shetab.api.SEMessageParser.prototype.preProcessMessage = function (message)
 {
    return null;
};
shetab.api.SEMessageParser.prototype.processMessage$$String = function (message)
 {
    return this.processMessage$$SEMessage(shetab.SEMessage.fromXml(message));
};
shetab.api.SEMessageParser.prototype.processMessage$$SEMessage = function (message)
 {
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
    return (ret !== null ? ret : shetab.api.SEMessageParser.c_null);
};
shetab.api.SEMessageParser.prototype.processProperty = function (message, propertyName, propertyValue)
 {
    return shetab.api.SEMessageParser.doProcessProperty(message, propertyName, propertyValue);
};
shetab.api.SEMessageParser.prototype.processMethod = function (message)
 {
    return shetab.api.SEMessageParser.doProcessMethod(message);
};
shetab.api.SEMessageParser.getStorageCallback = function (targetInstanceId, callbackId)
 {
    return function (param)
    {
        var agent = (function ()
        {
            var $v34 = new shetab.api.SEAgent();
            $v34.set_targetInstanceId(targetInstanceId);
            return $v34;
        }).call(this);
        if (param.type === "text")
            param.response;
        if (param.type === "byteArray")

            shetab.common.Convert.buffer_toBase64(param.response);
        agent.invokeStorageCallback(callbackId, param.success, param.statusText, param.type === "text" ? param.response : null , param.type === "byteArray" ? param.response : null , param.type);
    };
};
shetab.api.SEMessageParser.doProcessProperty = function (message, propertyName, propertyValue)
 {
    var isGet = propertyValue === null;
    var api = new shetab.api.SEEbookApi(message);
    if (message.typeName === "PropertyBag")
    {
        if (propertyName === "schema")
        {
            if (isGet)
            {
                var res = api.propertyBag.schema;
                return res;
            }
            throw new Error("schema property is read-only!");
        }
    }
    if (message.typeName === "Storage")
    {
        if (propertyName === "canWrite")
        {
            if (isGet)
            {
                var res = api.storage.canWrite;
                return (res === null) ? null : res.toString();
            }
            throw new Error("canWrite property is read-only!");
        }
    }
    if (message.typeName === "InternalCore")
    {
        if (propertyName === "selectedItemsXml")
        {
            if (isGet)
            {
                var res = api.internalCore.selectedItemsXml;
                return res;
            }
            api.internalCore.selectedItemsXml = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "Core")
    {
        if (propertyName === "moduleEntityId")
        {
            if (isGet)
            {
                var res = api.core.moduleEntityId;
                return res;
            }
            throw new Error("moduleEntityId property is read-only!");
        }
        if (propertyName === "canActive")
        {
            if (isGet)
            {
                var res = api.core.canActive;
                return (res === null) ? null : res.toString();
            }
            api.core.canActive = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isActiveModule")
        {
            if (isGet)
            {
                var res = api.core.isActiveModule;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isActiveModule property is read-only!");
        }
        if (propertyName === "isContainsActiveModule")
        {
            if (isGet)
            {
                var res = api.core.isContainsActiveModule;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isContainsActiveModule property is read-only!");
        }
        if (propertyName === "selectedItem")
        {
            if (isGet)
            {
                var res = api.core.selectedItem;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "SelectedItem");
            }
            api.core.selectedItem = shetab.common.serialization.Serializer.serializeFromXml(propertyValue,  shetab.api.SESelectedItem);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "selectedItems")
        {
            if (isGet)
            {
                var res = api.core.selectedItems;
                return (res === null) ? null : shetab.SEMessage.array_toString(res);
            }
            api.core.selectedItems = shetab.SEMessage.array_fromString(propertyValue,  shetab.api.SESelectedItem);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "projectBooksFolder")
        {
            if (isGet)
            {
                var res = api.core.projectBooksFolder;
                return res;
            }
            throw new Error("projectBooksFolder property is read-only!");
        }
        if (propertyName === "projectUrl")
        {
            if (isGet)
            {
                var res = api.core.projectUrl;
                return res;
            }
            api.core.projectUrl = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "productName")
        {
            if (isGet)
            {
                var res = api.core.productName;
                return res;
            }
            throw new Error("productName property is read-only!");
        }
        if (propertyName === "productVersion")
        {
            if (isGet)
            {
                var res = api.core.productVersion;
                return res;
            }
            throw new Error("productVersion property is read-only!");
        }
        if (propertyName === "productCompanyName")
        {
            if (isGet)
            {
                var res = api.core.productCompanyName;
                return res;
            }
            throw new Error("productCompanyName property is read-only!");
        }
        if (propertyName === "productSupportEmail")
        {
            if (isGet)
            {
                var res = api.core.productSupportEmail;
                return res;
            }
            throw new Error("productSupportEmail property is read-only!");
        }
        if (propertyName === "productSupportUrl")
        {
            if (isGet)
            {
                var res = api.core.productSupportUrl;
                return res;
            }
            throw new Error("productSupportUrl property is read-only!");
        }
        if (propertyName === "productSupportPhone")
        {
            if (isGet)
            {
                var res = api.core.productSupportPhone;
                return res;
            }
            throw new Error("productSupportPhone property is read-only!");
        }
        if (propertyName === "productCopyright")
        {
            if (isGet)
            {
                var res = api.core.productCopyright;
                return res;
            }
            throw new Error("productCopyright property is read-only!");
        }
        if (propertyName === "productCulture")
        {
            if (isGet)
            {
                var res = api.core.productCulture;
                return res;
            }
            api.core.productCulture = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "shetabReaderVersion")
        {
            if (isGet)
            {
                var res = api.core.shetabReaderVersion;
                return res;
            }
            throw new Error("shetabReaderVersion property is read-only!");
        }
        if (propertyName === "windowState")
        {
            if (isGet)
            {
                var res = api.core.windowState;
                return res;
            }
            api.core.windowState = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "visible")
        {
            if (isGet)
            {
                var res = api.core.visible;
                return (res === null) ? null : res.toString();
            }
            api.core.visible = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "position")
        {
            if (isGet)
            {
                var res = api.core.position;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "Position");
            }
            api.core.position = shetab.common.Convert.toPoint(propertyValue);
            return shetab.SEMessage.c_undefined;

        }
        if (propertyName === "size")
        {
            if (isGet)
            {
                var res = api.core.size;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "Size");
            }
            api.core.size = shetab.common.Convert.toSize(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "viewSize")
        {
            if (isGet)
            {
                var res = api.core.viewSize;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "ViewSize");
            }
            throw new Error("viewSize property is read-only!");
        }
        if (propertyName === "maxSize")
        {
            if (isGet)
            {
                var res = api.core.maxSize;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "MaxSize");
            }
            api.core.maxSize = shetab.common.Convert.toSize(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isShortcutMenuEnabled")
        {
            if (isGet)
            {
                var res = api.core.isShortcutMenuEnabled;
                return (res === null) ? null : res.toString();
            }
            api.core.isShortcutMenuEnabled = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "minSize")
        {
            if (isGet)
            {
                var res = api.core.minSize;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "MinSize");
            }
            api.core.minSize = shetab.common.Convert.toSize(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "fullScreen")
        {
            if (isGet)
            {
                var res = api.core.fullScreen;
                return (res === null) ? null : res.toString();
            }
            api.core.fullScreen = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "fullView")
        {
            if (isGet)
            {
                var res = api.core.fullView;
                return (res === null) ? null : res.toString();
            }
            api.core.fullView = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "skinVisible")
        {
            if (isGet)
            {
                var res = api.core.skinVisible;
                return (res === null) ? null : res.toString();
            }
            api.core.skinVisible = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "readerSkins")
        {
            if (isGet)
            {
                var res = api.core.readerSkins;
                return res;
            }
            api.core.readerSkins = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "skinId")
        {
            if (isGet)
            {
                var res = api.core.skinId;
                return res;
            }
            api.core.skinId = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "navigationPanelVisible")
        {
            if (isGet)
            {
                var res = api.core.navigationPanelVisible;
                return (res === null) ? null : res.toString();
            }
            api.core.navigationPanelVisible = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "navigationPanelLock")
        {
            if (isGet)
            {
                var res = api.core.navigationPanelLock;
                return (res === null) ? null : res.toString();
            }
            api.core.navigationPanelLock = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "navigationPanelWidth")
        {
            if (isGet)
            {
                var res = api.core.navigationPanelWidth;
                return (res === null) ? null : res.toString();
            }
            api.core.navigationPanelWidth = shetab.common.Convert.toNumber(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "navigationPanelAutoHide")
        {
            if (isGet)
            {
                var res = api.core.navigationPanelAutoHide;
                return (res === null) ? null : res.toString();
            }
            api.core.navigationPanelAutoHide = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "markupWindowVisible")
        {
            if (isGet)
            {
                var res = api.core.markupWindowVisible;
                return (res === null) ? null : res.toString();
            }
            api.core.markupWindowVisible = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "commentWindowVisible")
        {
            if (isGet)
            {
                var res = api.core.commentWindowVisible;
                return (res === null) ? null : res.toString();
            }
            api.core.commentWindowVisible = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isEffect3DEnabled")
        {
            if (isGet)
            {
                var res = api.core.isEffect3DEnabled;
                return (res === null) ? null : res.toString();
            }
            api.core.isEffect3DEnabled = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isEffect3DAvailable")
        {
            if (isGet)
            {
                var res = api.core.isEffect3DAvailable;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isEffect3DAvailable property is read-only!");
        }
        if (propertyName === "pageDisplay")
        {
            if (isGet)
            {
                var res = api.core.pageDisplay;
                return res;
            }
            api.core.pageDisplay = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "highlightSearch")
        {
            if (isGet)
            {
                var res = api.core.highlightSearch;
                return (res === null) ? null : res.toString();
            }
            api.core.highlightSearch = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "skinClientLocation")
        {
            if (isGet)
            {
                var res = api.core.skinClientLocation;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "SkinClientLocation");
            }
            api.core.skinClientLocation = shetab.common.Convert.toPoint(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "skinClientSize")
        {
            if (isGet)
            {

                var res = api.core.skinClientSize;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "SkinClientSize");
            }
            api.core.skinClientSize = shetab.common.Convert.toSize(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "skinClientVisible")
        {
            if (isGet)
            {
                var res = api.core.skinClientVisible;
                return (res === null) ? null : res.toString();
            }
            api.core.skinClientVisible = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "skinDesignSize")
        {
            if (isGet)
            {
                var res = api.core.skinDesignSize;
                return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "SkinDesignSize");
            }
            api.core.skinDesignSize = shetab.common.Convert.toSize(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "skinAutoZoom")
        {
            if (isGet)
            {
                var res = api.core.skinAutoZoom;
                return (res === null) ? null : res.toString();
            }
            api.core.skinAutoZoom = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "skinFile")
        {
            if (isGet)
            {
                var res = api.core.skinFile;
                return res;
            }
            api.core.skinFile = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "contentsViewLink")
        {
            if (isGet)
            {
                var res = api.core.contentsViewLink;
                return res;
            }
            api.core.contentsViewLink = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "defaultContentsViewLink")
        {
            if (isGet)
            {
                var res = api.core.defaultContentsViewLink;
                return res;
            }
            api.core.defaultContentsViewLink = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isDiagnosticsInfoEnabled")
        {
            if (isGet)
            {
                var res = api.core.isDiagnosticsInfoEnabled;
                return (res === null) ? null : res.toString();
            }
            api.core.isDiagnosticsInfoEnabled = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "soundVolume")
        {
            if (isGet)
            {
                var res = api.core.soundVolume;
                return (res === null) ? null : res.toString();
            }
            api.core.soundVolume = shetab.common.Convert.toNumber(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "mute")
        {
            if (isGet)
            {
                var res = api.core.mute;
                return (res === null) ? null : res.toString();
            }
            api.core.mute = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "commentSubject")
        {
            if (isGet)
            {
                var res = api.core.commentSubject;
                return res;
            }
            api.core.commentSubject = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "commentAuthor")
        {
            if (isGet)
            {
                var res = api.core.commentAuthor;
                return res;
            }
            api.core.commentAuthor = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "commentText")
        {
            if (isGet)
            {
                var res = api.core.commentText;
                return res;
            }
            api.core.commentText = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "commentTime")
        {
            if (isGet)
            {
                var res = api.core.commentTime;
                return res;
            }
            api.core.commentTime = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "pageLabel")
        {
            if (isGet)
            {
                var res = api.core.pageLabel;
                return res;
            }
            api.core.pageLabel = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "pageCount")
        {
            if (isGet)
            {
                var res = api.core.pageCount;
                return (res === null) ? null : res.toString();
            }
            throw new Error("pageCount property is read-only!");
        }
        if (propertyName === "searchQuery")
        {
            if (isGet)
            {
                var res = api.core.searchQuery;
                return res;
            }
            api.core.searchQuery = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "zoom")
        {
            if (isGet)
            {
                var res = api.core.zoom;
                return (res === null) ? null : res.toString();
            }
            api.core.zoom = shetab.common.Convert.toNumber(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "zoomMode")
        {
            if (isGet)
            {
                var res = api.core.zoomMode;
                return res;
            }
            api.core.zoomMode = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "uiCulture")
        {
            if (isGet)
            {
                var res = api.core.uiCulture;
                return res;
            }
            api.core.uiCulture = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isCommentSubjectEnabled")
        {
            if (isGet)
            {
                var res = api.core.isCommentSubjectEnabled;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isCommentSubjectEnabled property is read-only!");
        }
        if (propertyName === "isCommentAuthorEnabled")
        {
            if (isGet)
            {
                var res = api.core.isCommentAuthorEnabled;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isCommentAuthorEnabled property is read-only!");
        }
        if (propertyName === "isCommentTextEnabled")
        {
            if (isGet)
            {
                var res = api.core.isCommentTextEnabled;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isCommentTextEnabled property is read-only!");
        }
        if (propertyName === "isCommentTimeEnabled")
        {
            if (isGet)
            {
                var res = api.core.isCommentTimeEnabled;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isCommentTimeEnabled property is read-only!");
        }

        if (propertyName === "isPageLabelEnabled")
        {
            if (isGet)
            {
                var res = api.core.isPageLabelEnabled;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isPageLabelEnabled property is read-only!");
        }
        if (propertyName === "isPageCountEnabled")
        {
            if (isGet)
            {
                var res = api.core.isPageCountEnabled;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isPageCountEnabled property is read-only!");
        }
        if (propertyName === "isSearchQueryEnabled")
        {
            if (isGet)
            {
                var res = api.core.isSearchQueryEnabled;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isSearchQueryEnabled property is read-only!");
        }
        if (propertyName === "topics")
        {
            if (isGet)
            {
                var res = api.core.topics;
                return res;
            }
            throw new Error("topics property is read-only!");
        }
        if (propertyName === "currentTopicId")
        {
            if (isGet)
            {
                var res = api.core.currentTopicId;
                return res;
            }
            api.core.currentTopicId = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "selectedTopicId")
        {
            if (isGet)
            {
                var res = api.core.selectedTopicId;
                return res;
            }
            throw new Error("selectedTopicId property is read-only!");
        }
        if (propertyName === "currentRootTopicId")
        {
            if (isGet)
            {
                var res = api.core.currentRootTopicId;
                return res;
            }
            api.core.currentRootTopicId = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "documentUrl")
        {
            if (isGet)
            {
                var res = api.core.documentUrl;
                return res;
            }
            throw new Error("documentUrl property is read-only!");
        }
        if (propertyName === "documentLink")
        {
            if (isGet)
            {
                var res = api.core.documentLink;
                return res;
            }
            api.core.documentLink = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "mediaPosition")
        {
            if (isGet)
            {
                var res = api.core.mediaPosition;
                return (res === null) ? null : res.toString();
            }
            api.core.mediaPosition = shetab.common.Convert.toNumber(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "mediaState")
        {
            if (isGet)
            {
                var res = api.core.mediaState;
                return res;
            }
            api.core.mediaState = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "mediaLength")
        {
            if (isGet)
            {
                var res = api.core.mediaLength;
                return (res === null) ? null : res.toString();
            }
            throw new Error("mediaLength property is read-only!");
        }
        if (propertyName === "isMediaOpen")
        {
            if (isGet)
            {
                var res = api.core.isMediaOpen;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isMediaOpen property is read-only!");
        }
        if (propertyName === "isMediaPlaying")
        {
            if (isGet)
            {
                var res = api.core.isMediaPlaying;
                return (res === null) ? null : res.toString();
            }
            api.core.isMediaPlaying = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isMediaPaused")
        {
            if (isGet)
            {
                var res = api.core.isMediaPaused;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isMediaPaused property is read-only!");
        }
        if (propertyName === "isMediaStopped")
        {
            if (isGet)
            {
                var res = api.core.isMediaStopped;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isMediaStopped property is read-only!");
        }
        if (propertyName === "showAboutEngineMenu")
        {
            if (isGet)
            {
                var res = api.core.showAboutEngineMenu;
                return (res === null) ? null : res.toString();
            }
            api.core.showAboutEngineMenu = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "flowDirection")
        {
            if (isGet)
            {
                var res = api.core.flowDirection;
                return res;
            }
            throw new Error("flowDirection property is read-only!");
        }
        if (propertyName === "uiFlowDirection")
        {
            if (isGet)
            {
                var res = api.core.uiFlowDirection;
                return res;
            }
            throw new Error("uiFlowDirection property is read-only!");
        }
        if (propertyName === "isShetabEbookHost")
        {
            if (isGet)
            {
                var res = api.core.isShetabEbookHost;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isShetabEbookHost property is read-only!");
        }
        if (propertyName === "isTestMode")
        {
            if (isGet)
            {
                var res = api.core.isTestMode;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isTestMode property is read-only!");
        }
        if (propertyName === "moduleFile")
        {
            if (isGet)
            {
                var res = api.core.moduleFile;
                return res;
            }
            throw new Error("moduleFile property is read-only!");
        }
        if (propertyName === "moduleFolder")
        {
            if (isGet)
            {
                var res = api.core.moduleFolder;
                return res;
            }
            throw new Error("moduleFolder property is read-only!");
        }
        if (propertyName === "enableUpdateView")
        {
            if (isGet)
            {
                var res = api.core.enableUpdateView;
                return (res === null) ? null : res.toString();
            }
            api.core.enableUpdateView = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "enableFocus")
        {
            if (isGet)
            {
                var res = api.core.enableFocus;
                return (res === null) ? null : res.toString();
            }
            api.core.enableFocus = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isDesignMode")
        {
            if (isGet)
            {
                var res = api.core.isDesignMode;

                return (res === null) ? null : res.toString();
            }
            throw new Error("isDesignMode property is read-only!");
        }
        if (propertyName === "plugins")
        {
            if (isGet)
            {
                var res = api.core.plugins;
                return res;
            }
            throw new Error("plugins property is read-only!");
        }
        if (propertyName === "selectedBookId")
        {
            if (isGet)
            {
                var res = api.core.selectedBookId;
                return res;
            }
            throw new Error("selectedBookId property is read-only!");
        }
        if (propertyName === "rootBookId")
        {
            if (isGet)
            {
                var res = api.core.rootBookId;
                return res;
            }
            api.core.rootBookId = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "books")
        {
            if (isGet)
            {
                var res = api.core.books;
                return res;
            }
            throw new Error("books property is read-only!");
        }
        if (propertyName === "shetabWebSiteUrl")
        {
            if (isGet)
            {
                var res = api.core.shetabWebSiteUrl;
                return res;
            }
            throw new Error("shetabWebSiteUrl property is read-only!");
        }
        if (propertyName === "mediaPositionGrabMode")
        {
            if (isGet)
            {
                var res = api.core.mediaPositionGrabMode;
                return (res === null) ? null : res.toString();
            }
            api.core.mediaPositionGrabMode = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "contentsRoot")
        {
            if (isGet)
                throw new Error("contentsRoot property is write-only!");
            api.core.contentsRoot = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
    }
    return shetab.SEMessage.c_unhandled;
};
shetab.api.SEMessageParser.doProcessMethod = function (message)
 {
    var api = new shetab.api.SEEbookApi(message);
    if (message.typeName === "PropertyBag")
    {
        if (message.methodName === "getItems")
        {
            var res = api.propertyBag.getItems(message.getParam("propertySetId"));
            return (res === null) ? null : shetab.SEMessage.array_toString(res);
        }
        if (message.methodName === "removeItem")
        {
            api.propertyBag.removeItem(message.getParam("itemId"), message.getParam("propertySetId"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "getPropertySetSchema")
        {
            var res = api.propertyBag.getPropertySetSchema(message.getParam("propertySetId"));
            return res;
        }
        if (message.methodName === "getPropertyRaw")
        {
            var res = api.propertyBag.getPropertyRaw(message.getParam("propertyName"), message.getParam("itemId"), message.getParam("propertySetId"));
            return res;
        }
        if (message.methodName === "setPropertyRaw")
        {
            api.propertyBag.setPropertyRaw(message.getParam("propertyName"), message.getParam("value"), message.getParam("itemId"), message.getParam("propertySetId"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "getPropertiesRaw")
        {
            var res = api.propertyBag.getPropertiesRaw(message.getParam("itemId"), message.getParam("propertySetId"));
            return (res === null) ? null : shetab.SEMessage.dictionary_toString(res);
        }
        if (message.methodName === "resetProperty")
        {
            api.propertyBag.resetProperty(message.getParam("propertyName"), message.getParam("itemId"), message.getParam("propertySetId"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "resetAllProperties")
        {
            api.propertyBag.resetAllProperties(message.getParam("itemId"), message.getParam("propertySetId"));
            return shetab.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "Storage")
    {
        if (message.methodName === "deleteFile")
        {
            api.storage.deleteFile(message.getParam("fileName"), shetab.api.SEMessageParser.getStorageCallback(message.callerInstanceId, message.getParam("doneCallback")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "readBinaryFile")
        {
            api.storage.readBinaryFile(message.getParam("fileName"), shetab.api.SEMessageParser.getStorageCallback(message.callerInstanceId, message.getParam("doneCallback")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "readTextFile")
        {
            api.storage.readTextFile(message.getParam("fileName"), shetab.api.SEMessageParser.getStorageCallback(message.callerInstanceId, message.getParam("doneCallback")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "writeBinaryFile")
        {
            api.storage.writeBinaryFile(message.getParam("fileName"), message.getParamByteArray("data"), shetab.api.SEMessageParser.getStorageCallback(message.callerInstanceId, message.getParam("doneCallback")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "writeTextFile")
        {
            api.storage.writeTextFile(message.getParam("fileName"), message.getParam("text"), shetab.api.SEMessageParser.getStorageCallback(message.callerInstanceId, message.getParam("doneCallback")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "getFileUrl")
        {
            api.storage.getFileUrl(message.getParam("fileName"), shetab.api.SEMessageParser.getStorageCallback(message.callerInstanceId, message.getParam("doneCallback")));
            return shetab.SEMessage.c_undefined;
        }
    }
    if (message.typeName === "InternalCore")
    {
        if (message.methodName === "getPropertyBagChangeSet")
        {
            var res = api.internalCore.getPropertyBagChangeSet(message.getParam("moduleEntityId"), message.getParam("changeSetId"));
            return (res === null) ? null : shetab.SEMessage.array_toString(res);
        }
        if (message.methodName === "activateModule")
        {
            api.internalCore.activateModule(shetab.common.Convert.toBoolean(message.getParam("value")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "initializeModule")
        {
            var res = api.internalCore.initializeModule(message.getParam("agentVersion"), message.getParam("url"), message.getParam("parentInstanceId"), message.getParam("placeholderId"), message.getParam("sessionName"));
            return res;
        }
        if (message.methodName === "uninitializeModule")
        {
            api.internalCore.uninitializeModule();
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "initializeCommandHandler")
        {
            api.internalCore.initializeCommandHandler(shetab.SEMessage.array_fromString(message.getParam("interfaces"),  String));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "executeCommand")
        {
            api.internalCore.executeCommand(message.getParam("commandName"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "addModulePlaceholder")
        {

            api.internalCore.addModulePlaceholder(message.getParam("placeholderId"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "setProperty")
        {
            api.internalCore.setProperty(message.getParam("propertyName"), message.getParam("propertyValue"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "getProperty")
        {
            var res = api.internalCore.getProperty(message.getParam("propertyName"), message.getParam("testValue"));
            return res;
        }
        if (message.methodName === "convertDeprecatedToken")
        {
            var res = api.internalCore.convertDeprecatedToken(message.getParam("tokenName"));
            return res;
        }
        if (message.methodName === "getModulePropertyXml")
        {
            var res = api.internalCore.getModulePropertyXml(message.getParam("propertyName"), message.getParam("itemId"), message.getParam("propertySetId"), message.getParam("moduleEntityId"));
            return res;
        }
        if (message.methodName === "getModulePropertiesXml")
        {
            var res = api.internalCore.getModulePropertiesXml(message.getParam("itemId"), message.getParam("propertySetId"), message.getParam("moduleEntityId"));
            return res;
        }
    }
    if (message.typeName === "Core")
    {
        if (message.methodName === "getPropertyBag")
        {
            api.core.getPropertyBag(message.getParam("moduleEntityId"), shetab.api.SEMessageParser.getStorageCallback(message.callerInstanceId, message.getParam("doneCallback")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "setSelectedItem")
        {
            api.core.setSelectedItem(message.getParam("itemId"), message.getParam("propertySetId"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "getDocumentInfoByLink")
        {
            var res = api.core.getDocumentInfoByLink(message.getParam("link"));
            return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "GetDocumentInfoByLink");
        }
        if (message.methodName === "getDocumentInfoByUrl")
        {
            var res = api.core.getDocumentInfoByUrl(message.getParam("url"));
            return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "GetDocumentInfoByUrl");
        }
        if (message.methodName === "index")
        {
            api.core.index(message.getParam("queryString"), shetab.common.Convert.toBoolean(message.getParam("locateIndex")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "openUrl")
        {
            api.core.openUrl(message.getParam("url"), message.getParam("parameters"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "search")
        {
            api.core.search(message.getParam("queryString"), shetab.common.Convert.toNumber(message.getParam("startIndex", "1")), shetab.common.Convert.toNumber(message.getParam("resultCount", "10")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "getPromptFont")
        {
            var res = api.core.getPromptFont(shetab.common.serialization.Serializer.serializeFromXml(message.getParam("initFont"),  shetab.common.Font));
            return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "GetPromptFont");
        }
        if (message.methodName === "getPromptColor")
        {
            var res = api.core.getPromptColor(shetab.common.Convert.toColor(message.getParam("initColor")));
            return (res === null) ? null : shetab.common.serialization.Serializer.serializeToXml(res, "GetPromptColor");
        }
        if (message.methodName === "exportFiles")
        {
            api.core.exportFiles(message.getParam("links"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "printFiles")
        {
            api.core.printFiles(message.getParam("links"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "navigateDocument")
        {
            api.core.navigateDocument(message.getParam("link"), shetab.common.Convert.toBoolean(message.getParam("keepSound")), message.getParam("highlightKeywords"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "navigatePageLabel")
        {
            api.core.navigatePageLabel(message.getParam("label"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "playSound")
        {
            api.core.playSound(message.getParam("link"), shetab.common.Convert.toBoolean(message.getParam("backgroundMode")), shetab.common.Convert.toBoolean(message.getParam("loopSound")));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "localizeText")
        {
            var res = api.core.localizeText(message.getParam("text"));
            return res;
        }
        if (message.methodName === "getUrlFromLink")
        {
            var res = api.core.getUrlFromLink(message.getParam("link"));
            return res;
        }
        if (message.methodName === "getLinkFromUrl")
        {
            var res = api.core.getLinkFromUrl(message.getParam("link"));
            return res;
        }
        if (message.methodName === "getResource")
        {
            var res = api.core.getResource(message.getParam("resourceFile"), message.getParam("resourceKey"));
            return res;
        }
        if (message.methodName === "getPromptFolder")
        {
            var res = api.core.getPromptFolder(message.getParam("initFolder"), message.getParam("rootFolder"), message.getParam("title"));
            return res;
        }
        if (message.methodName === "getPromptFileOpen")
        {
            var res = api.core.getPromptFileOpen(message.getParam("fileName"), message.getParam("filter"));
            return res;
        }
        if (message.methodName === "sendCustomNotify")
        {
            var res = api.core.sendCustomNotify(message.getParam("customNotifyName"), message.getParam("customNotifyValue"));
            return res;
        }
        if (message.methodName === "getTopicIdBookOwner")
        {
            var res = api.core.getTopicIdBookOwner(message.getParam("topicId"));
            return res;
        }
        if (message.methodName === "getTopic")
        {
            var res = api.core.getTopic(message.getParam("topicId"));
            return res;
        }
        if (message.methodName === "findTopic")
        {
            var res = api.core.findTopic(message.getParam("startTopicId"), message.getParam("topicId"));
            return res;
        }
        if (message.methodName === "getCommandStatus")
        {
            var res = api.core.getCommandStatus(message.getParam("commandName"), shetab.common.Convert.toBoolean(message.getParam("checkedState")));
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "canExecuteCommand")
        {
            var res = api.core.canExecuteCommand(message.getParam("commandName"));
            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "executeCommand")
        {
            api.core.executeCommand(message.getParam("commandName"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "canGetProperty")
        {
            var res = api.core.canGetProperty(message.getParam("propertyName"));

            return (res === null) ? null : res.toString();
        }
        if (message.methodName === "canSetProperty")
        {
            var res = api.core.canSetProperty(message.getParam("propertyName"), message.getParam("value"));
            return (res === null) ? null : res.toString();
        }
    }
    return shetab.SEMessage.c_unhandled;
};
shetab.api.SEPropertyBagApi = function (callerInstanceId, moduleEntityId)
 {
    this._propertyBag = null;
    this._moduleEntityId = null;
    this._moduleEntityId = moduleEntityId;
    var moduleInstance = shetab.SEEngine.get_current().moduleManager.getModuleInstanceById(callerInstanceId);
    this._propertyBag = shetab.SEEngine.get_current().moduleManager.getPropertyBagFromLoadedModuleEntities(moduleEntityId, moduleInstance);
    if (this._propertyBag === null)
        throw new Error("Could not find property bag from loaded module entities: moduleEntityId: " + moduleEntityId);
};
shetab.api.SEPropertyBagApi.prototype.getItems = function (propertySetId)
 {
    return this._propertyBag.getItems(propertySetId);
};
shetab.api.SEPropertyBagApi.prototype.getProperties = function (itemId, propertySetId)
 {
    throw new Error("Method should not call directly!");
};
shetab.api.SEPropertyBagApi.prototype.getProperty = function (propertyName, itemId, propertySetId)
 {
    throw new Error("Method should not call directly!");
};
shetab.api.SEPropertyBagApi.prototype.setProperty = function (propertyName, value, itemId, propertySetId)
 {
    throw new Error("Method should not call directly!");
};
shetab.api.SEPropertyBagApi.prototype.removeItem = function (itemId, propertySetId)
 {
    this._propertyBag.removeItem(itemId, propertySetId);
};
shetab.api.SEPropertyBagApi.prototype.get_schema = function ()
 {
    return shetab.common.serialization.Serializer.serializeToXml(this._propertyBag.get_schema(), "propertyBagSchema");
};
Object.defineProperty(shetab.api.SEPropertyBagApi.prototype, "schema", {get: shetab.api.SEPropertyBagApi.prototype.get_schema, enumerable: true});
shetab.api.SEPropertyBagApi.prototype.getPropertySetSchema = function (propertySetId)
 {
    var propertySet = this._propertyBag.get_schema().propertySets[propertySetId];
    return !shetab.common.Utility.isDefined(propertySet) ? null : shetab.common.serialization.Serializer.serializeToXml(propertySet, "propertySet");
};
shetab.api.SEPropertyBagApi.prototype.getPropertiesRaw = function (itemId, propertySetId)
 {
    return this._propertyBag.getProperties(itemId, propertySetId);
};
shetab.api.SEPropertyBagApi.prototype.getPropertyRaw = function (propertyName, itemId, propertySetId)
 {
    return this._propertyBag.getProperty(propertyName, itemId, propertySetId);
};
shetab.api.SEPropertyBagApi.prototype.setPropertyRaw = function (propertyName, value, itemId, propertySetId)
 {
    if (this._propertyBag.setProperty(propertyName, value, itemId, propertySetId))
        shetab.SEEngine.get_current().firePropertyBagChanged((function ()
        {
            var $v35 = new shetab.api.SEPropertyBagItemProperty();
            $v35.set_itemId(itemId);
            $v35.set_moduleEntityId(this._moduleEntityId);
            $v35.set_propertySetId(propertySetId);
            $v35.set_propertyName(propertyName);
            return $v35;
        }).call(this));
};
shetab.api.SEPropertyBagApi.prototype.resetAllProperties = function (itemId, propertySetId)
 {
    if (this._propertyBag.resetAllProperties(itemId, propertySetId))
        shetab.SEEngine.get_current().firePropertyBagChanged((function ()
        {
            var $v36 = new shetab.api.SEPropertyBagItemProperty();
            $v36.set_itemId(itemId);
            $v36.set_moduleEntityId(this._moduleEntityId);
            $v36.set_propertySetId(propertySetId);
            $v36.set_propertyName(null);
            return $v36;
        }).call(this));
};
shetab.api.SEPropertyBagApi.prototype.resetProperty = function (propertyName, itemId, propertySetId)
 {
    if (this._propertyBag.resetProperty(propertyName, itemId, propertySetId))
        shetab.SEEngine.get_current().firePropertyBagChanged((function ()
        {
            var $v37 = new shetab.api.SEPropertyBagItemProperty();
            $v37.set_itemId(itemId);
            $v37.set_moduleEntityId(this._moduleEntityId);
            $v37.set_propertySetId(propertySetId);
            $v37.set_propertyName(propertyName);
            return $v37;
        }).call(this));
};
shetab.api.SESelectedItem = function ()
 {
    this._itemId = null;
    this._propertySetId = null;
    this._moduleEntityId = null;
};
shetab.api.SESelectedItem.prototype.get_itemId = function ()
 {
    return this._itemId;
};
shetab.api.SESelectedItem.prototype.set_itemId = function (value)
 {
    this._itemId = value;
};
Object.defineProperty(shetab.api.SESelectedItem.prototype, "itemId", {get: shetab.api.SESelectedItem.prototype.get_itemId, set: shetab.api.SESelectedItem.prototype.set_itemId, enumerable: true});
shetab.api.SESelectedItem.prototype.get_propertySetId = function ()
 {
    return this._propertySetId;
};
shetab.api.SESelectedItem.prototype.set_propertySetId = function (value)
 {
    this._propertySetId = value;
};
Object.defineProperty(shetab.api.SESelectedItem.prototype, "propertySetId", {get: shetab.api.SESelectedItem.prototype.get_propertySetId, set: shetab.api.SESelectedItem.prototype.set_propertySetId, enumerable: true});
shetab.api.SESelectedItem.prototype.get_moduleEntityId = function ()
 {
    return this._moduleEntityId;
};
shetab.api.SESelectedItem.prototype.set_moduleEntityId = function (value)
 {
    this._moduleEntityId = value;
};
Object.defineProperty(shetab.api.SESelectedItem.prototype, "moduleEntityId", {get: shetab.api.SESelectedItem.prototype.get_moduleEntityId, set: shetab.api.SESelectedItem.prototype.set_moduleEntityId, enumerable: true});
shetab.api.SESelectedItem.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("itemId");
    info.addString("propertySetId");
    info.addString("moduleEntityId");
};
shetab.api.StorageCallbackParam = function (success, statusText, response, type)
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
shetab.api.SETopic = function ()
 {
};
if (typeof(shetab.commandHandlers) == "undefined")
    shetab.commandHandlers = {};
shetab.commandHandlers.SEEngineCommandHandler = function ()
 {
    this._commandsForActiveElement =  [shetab.tokens.SECommand.selectAll, shetab.tokens.SECommand.copySelection, shetab.tokens.SECommand.cutSelection, shetab.tokens.SECommand.paste, shetab.tokens.SECommand.deleteSelection];
};
shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager = function ()
 {
    return shetab.SEEngine.get_current().moduleManager;
};
Object.defineProperty(shetab.commandHandlers.SEEngineCommandHandler, "moduleManager", {get: shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager, enumerable: true});
shetab.commandHandlers.SEEngineCommandHandler.prototype.isCommandForActiveModule = function (command)
 {
    return this._commandsForActiveElement.indexOf(command) !== -1;
};
shetab.commandHandlers.SEEngineCommandHandler.prototype.getCommandHandlers = function (active, main, sound)
 {
    var ret =  [];
    if (active && shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_activeModuleInstance() !== null && shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_activeModuleInstance().commandHandler !== null)

        ret.push(shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_activeModuleInstance().commandHandler);
    if (main && shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_mainViewModuleInstance() !== null && shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_mainViewModuleInstance().commandHandler !== null)
        ret.push(shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_mainViewModuleInstance().commandHandler);
    if (sound && shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_soundModuleInstance() !== null && shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_soundModuleInstance().commandHandler !== null)
        ret.push(shetab.commandHandlers.SEEngineCommandHandler.get_moduleManager().get_soundModuleInstance().commandHandler);
    return ret;
};
shetab.commandHandlers.SEEngineCommandHandler.prototype.get_zoomCommandHandler = function ()
 {
    for (var $i2 = 0, $t2 = this.getCommandHandlers(true, true, false), $l2 = $t2.length, item = $t2[$i2]; $i2 < $l2; $i2++, item = $t2[$i2])
        if (item.get_zoomCommandHandler() !== null)
            return item.get_zoomCommandHandler();
    return null;
};
Object.defineProperty(shetab.commandHandlers.SEEngineCommandHandler.prototype, "zoomCommandHandler", {get: shetab.commandHandlers.SEEngineCommandHandler.prototype.get_zoomCommandHandler, enumerable: true});
shetab.commandHandlers.SEEngineCommandHandler.prototype.get_mediaCommandHandler = function ()
 {
    for (var $i3 = 0, $t3 = this.getCommandHandlers(true, true, true), $l3 = $t3.length, item = $t3[$i3]; $i3 < $l3; $i3++, item = $t3[$i3])
        if (item.get_mediaCommandHandler() !== null)
            return item.get_mediaCommandHandler();
    return null;
};
Object.defineProperty(shetab.commandHandlers.SEEngineCommandHandler.prototype, "mediaCommandHandler", {get: shetab.commandHandlers.SEEngineCommandHandler.prototype.get_mediaCommandHandler, enumerable: true});
shetab.commandHandlers.SEEngineCommandHandler.prototype.get_documentCommandHandler = function ()
 {
    for (var $i4 = 0, $t4 = this.getCommandHandlers(true, true, false), $l4 = $t4.length, item = $t4[$i4]; $i4 < $l4; $i4++, item = $t4[$i4])
        if (item.get_documentCommandHandler() !== null)
            return item.get_documentCommandHandler();
    return null;
};
Object.defineProperty(shetab.commandHandlers.SEEngineCommandHandler.prototype, "documentCommandHandler", {get: shetab.commandHandlers.SEEngineCommandHandler.prototype.get_documentCommandHandler, enumerable: true});
shetab.commandHandlers.SEEngineCommandHandler.prototype.get_editCommandHandler = function ()
 {
    for (var $i5 = 0, $t5 = this.getCommandHandlers(true, false, false), $l5 = $t5.length, item = $t5[$i5]; $i5 < $l5; $i5++, item = $t5[$i5])
        if (item.get_editCommandHandler() !== null)
            return item.get_editCommandHandler();
    return null;
};
Object.defineProperty(shetab.commandHandlers.SEEngineCommandHandler.prototype, "editCommandHandler", {get: shetab.commandHandlers.SEEngineCommandHandler.prototype.get_editCommandHandler, enumerable: true});
shetab.commandHandlers.SEEngineCommandHandler.prototype.get_pageCommandHandler = function ()
 {
    for (var $i6 = 0, $t6 = this.getCommandHandlers(true, false, false), $l6 = $t6.length, item = $t6[$i6]; $i6 < $l6; $i6++, item = $t6[$i6])
        if (item.get_pageCommandHandler() !== null)
            return item.get_pageCommandHandler();
    return null;
};
Object.defineProperty(shetab.commandHandlers.SEEngineCommandHandler.prototype, "pageCommandHandler", {get: shetab.commandHandlers.SEEngineCommandHandler.prototype.get_pageCommandHandler, enumerable: true});
shetab.commandHandlers.SEEngineCommandHandler.prototype.get_printCommandHandler = function ()
 {
    for (var $i7 = 0, $t7 = this.getCommandHandlers(true, true, false), $l7 = $t7.length, item = $t7[$i7]; $i7 < $l7; $i7++, item = $t7[$i7])
        if (item.get_printCommandHandler() !== null)
            return item.get_printCommandHandler();
    return null;
};
Object.defineProperty(shetab.commandHandlers.SEEngineCommandHandler.prototype, "printCommandHandler", {get: shetab.commandHandlers.SEEngineCommandHandler.prototype.get_printCommandHandler, enumerable: true});
shetab.commandHandlers.SEEngineCommandHandler.prototype.get_textCommandHandler = function ()
 {
    for (var $i8 = 0, $t8 = this.getCommandHandlers(true, true, false), $l8 = $t8.length, item = $t8[$i8]; $i8 < $l8; $i8++, item = $t8[$i8])
        if (item.get_textCommandHandler() !== null)
            return item.get_textCommandHandler();
    return null;
};
Object.defineProperty(shetab.commandHandlers.SEEngineCommandHandler.prototype, "textCommandHandler", {get: shetab.commandHandlers.SEEngineCommandHandler.prototype.get_textCommandHandler, enumerable: true});
shetab.commandHandlers.SEEngineCommandHandler.prototype.processCommandUI = function (commandUI)
 {
    var checkActiveOnly = this.isCommandForActiveModule(commandUI.commandName);
    var commandHandlers = this.getCommandHandlers(true, !checkActiveOnly, !checkActiveOnly);
    for (var $i9 = 0, $l9 = commandHandlers.length, commandHandler = commandHandlers[$i9]; $i9 < $l9; $i9++, commandHandler = commandHandlers[$i9])
    {
        commandHandler.processCommandUI(commandUI);
        if (commandUI.get_isHandled())
            return;
    }
};
shetab.commandHandlers.SEModuleCommandHandler = function (moduleInstanceId, interfaces)
 {
    this._documentCommandHandler = null;
    this._editCommandHandler = null;
    this._mediaCommandHandler = null;
    this._pageCommandHandler = null;
    this._printCommandHandler = null;
    this._textCommandHandler = null;
    this._zoomCommandHandler = null;
    if (interfaces.indexOf("IDocumentCommandHandler") !== -1)
        this.set_documentCommandHandler((function ()
        {
            var $v38 = new shetab.api.SEDocumentCommandHandler();
            $v38.set_targetInstanceId(moduleInstanceId);
            return $v38;
        }).call(this));
    if (interfaces.indexOf("IEditCommandHandler") !== -1)
        this.set_editCommandHandler((function ()
        {
            var $v39 = new shetab.api.SEEditCommandHandler();
            $v39.set_targetInstanceId(moduleInstanceId);
            return $v39;
        }).call(this));
    if (interfaces.indexOf("IMediaCommandHandler") !== -1)
        this.set_mediaCommandHandler((function ()
        {
            var $v40 = new shetab.api.SEMediaCommandHandler();
            $v40.set_targetInstanceId(moduleInstanceId);
            return $v40;
        }).call(this));
    if (interfaces.indexOf("IPageCommandHandler") !== -1)
        this.set_pageCommandHandler((function ()
        {
            var $v41 = new shetab.api.SEPageCommandHandler();
            $v41.set_targetInstanceId(moduleInstanceId);
            return $v41;
        }).call(this));
    if (interfaces.indexOf("IPrintCommandHandler") !== -1)
        this.set_printCommandHandler((function ()
        {
            var $v42 = new shetab.api.SEPrintCommandHandler();
            $v42.set_targetInstanceId(moduleInstanceId);
            return $v42;
        }).call(this));
    if (interfaces.indexOf("ITextCommandHandler") !== -1)
        this.set_textCommandHandler((function ()
        {
            var $v43 = new shetab.api.SETextCommandHandler();
            $v43.set_targetInstanceId(moduleInstanceId);
            return $v43;
        }).call(this));
    if (interfaces.indexOf("IZoomCommandHandler") !== -1)
        this.set_zoomCommandHandler(new shetab.commandHandlers.SEModuleZoomCommandHandler((function ()
        {
            var $v44 = new shetab.api.SEZoomCommandHandler();
            $v44.set_targetInstanceId(moduleInstanceId);
            return $v44;
        }).call(this)));
};

shetab.commandHandlers.SEModuleCommandHandler.prototype.get_documentCommandHandler = function ()
 {
    return this._documentCommandHandler;
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.set_documentCommandHandler = function (value)
 {
    this._documentCommandHandler = value;
};
Object.defineProperty(shetab.commandHandlers.SEModuleCommandHandler.prototype, "documentCommandHandler", {get: shetab.commandHandlers.SEModuleCommandHandler.prototype.get_documentCommandHandler, set: shetab.commandHandlers.SEModuleCommandHandler.prototype.set_documentCommandHandler, enumerable: true});
shetab.commandHandlers.SEModuleCommandHandler.prototype.get_editCommandHandler = function ()
 {
    return this._editCommandHandler;
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.set_editCommandHandler = function (value)
 {
    this._editCommandHandler = value;
};
Object.defineProperty(shetab.commandHandlers.SEModuleCommandHandler.prototype, "editCommandHandler", {get: shetab.commandHandlers.SEModuleCommandHandler.prototype.get_editCommandHandler, set: shetab.commandHandlers.SEModuleCommandHandler.prototype.set_editCommandHandler, enumerable: true});
shetab.commandHandlers.SEModuleCommandHandler.prototype.get_mediaCommandHandler = function ()
 {
    return this._mediaCommandHandler;
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.set_mediaCommandHandler = function (value)
 {
    this._mediaCommandHandler = value;
};
Object.defineProperty(shetab.commandHandlers.SEModuleCommandHandler.prototype, "mediaCommandHandler", {get: shetab.commandHandlers.SEModuleCommandHandler.prototype.get_mediaCommandHandler, set: shetab.commandHandlers.SEModuleCommandHandler.prototype.set_mediaCommandHandler, enumerable: true});
shetab.commandHandlers.SEModuleCommandHandler.prototype.get_pageCommandHandler = function ()
 {
    return this._pageCommandHandler;
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.set_pageCommandHandler = function (value)
 {
    this._pageCommandHandler = value;
};
Object.defineProperty(shetab.commandHandlers.SEModuleCommandHandler.prototype, "pageCommandHandler", {get: shetab.commandHandlers.SEModuleCommandHandler.prototype.get_pageCommandHandler, set: shetab.commandHandlers.SEModuleCommandHandler.prototype.set_pageCommandHandler, enumerable: true});
shetab.commandHandlers.SEModuleCommandHandler.prototype.get_printCommandHandler = function ()
 {
    return this._printCommandHandler;
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.set_printCommandHandler = function (value)
 {
    this._printCommandHandler = value;
};
Object.defineProperty(shetab.commandHandlers.SEModuleCommandHandler.prototype, "printCommandHandler", {get: shetab.commandHandlers.SEModuleCommandHandler.prototype.get_printCommandHandler, set: shetab.commandHandlers.SEModuleCommandHandler.prototype.set_printCommandHandler, enumerable: true});
shetab.commandHandlers.SEModuleCommandHandler.prototype.get_textCommandHandler = function ()
 {
    return this._textCommandHandler;
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.set_textCommandHandler = function (value)
 {
    this._textCommandHandler = value;
};
Object.defineProperty(shetab.commandHandlers.SEModuleCommandHandler.prototype, "textCommandHandler", {get: shetab.commandHandlers.SEModuleCommandHandler.prototype.get_textCommandHandler, set: shetab.commandHandlers.SEModuleCommandHandler.prototype.set_textCommandHandler, enumerable: true});
shetab.commandHandlers.SEModuleCommandHandler.prototype.get_zoomCommandHandler = function ()
 {
    return this._zoomCommandHandler;
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.set_zoomCommandHandler = function (value)
 {
    this._zoomCommandHandler = value;
};
Object.defineProperty(shetab.commandHandlers.SEModuleCommandHandler.prototype, "zoomCommandHandler", {get: shetab.commandHandlers.SEModuleCommandHandler.prototype.get_zoomCommandHandler, set: shetab.commandHandlers.SEModuleCommandHandler.prototype.set_zoomCommandHandler, enumerable: true});
shetab.commandHandlers.SEModuleCommandHandler.prototype.processZoomCommandUI = function (commandUI)
 {
    if (this.get_zoomCommandHandler() === null)
        return;
    switch (commandUI.commandName)
    {
        case shetab.tokens.SECommand.zoomIn:
            commandUI.set_isEnabled(this.get_zoomCommandHandler().canZoomIn);
            if (commandUI.get_canInvoke())
                this.get_zoomCommandHandler().zoomIn();
            break;
        case shetab.tokens.SECommand.zoomOut:
            commandUI.set_isEnabled(this.get_zoomCommandHandler().canZoomOut);
            if (commandUI.get_canInvoke())
                this.get_zoomCommandHandler().zoomOut();
            break;
    }
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.processDocumentCommandHandler = function (commandUI)
 {
    if (this.get_documentCommandHandler() === null)
        return;
    switch (commandUI.commandName)
    {
        case shetab.tokens.SECommand.zoomIn:
            commandUI.set_isEnabled(this.get_zoomCommandHandler().canZoomIn);
            if (commandUI.get_canInvoke())
                this.get_zoomCommandHandler().zoomIn();
            break;
        case shetab.tokens.SECommand.zoomOut:
            commandUI.set_isEnabled(this.get_zoomCommandHandler().canZoomOut);
            if (commandUI.get_canInvoke())
                this.get_zoomCommandHandler().zoomOut();
            break;
    }
};
shetab.commandHandlers.SEModuleCommandHandler.prototype.processCommandUI = function (commandUI)
 {
    if (!commandUI.get_isHandled())
        this.processZoomCommandUI(commandUI);
};
shetab.api.SEEbookApi = function (message)
 {
    this._storage = null;
    this._internalCore = null;
    this._core = null;
    this._propertyBag = null;
    this.set_core(new shetab.api.SECore(message));
    this.set_internalCore(new shetab.api.SEInternalCore(message));
    if (message.typeName === "Storage")
    {
        var moduleInstance = shetab.SEEngine.get_current().moduleManager.getModuleInstanceById(message.callerInstanceId);
        this.set_storage(shetab.SEEngine.get_current().getStorage$$String$$SEModuleInstance(message.context, moduleInstance));
    }
    if (message.typeName === "PropertyBag")
    {
        this.set_propertyBag(new shetab.api.SEPropertyBagApi(message.callerInstanceId, message.context));
    }
};
shetab.api.SEEbookApi.prototype.get_storage = function ()
 {
    return this._storage;
};
shetab.api.SEEbookApi.prototype.set_storage = function (value)
 {
    this._storage = value;
};
Object.defineProperty(shetab.api.SEEbookApi.prototype, "storage", {get: shetab.api.SEEbookApi.prototype.get_storage, set: shetab.api.SEEbookApi.prototype.set_storage, enumerable: true});
shetab.api.SEEbookApi.prototype.get_internalCore = function ()
 {
    return this._internalCore;
};
shetab.api.SEEbookApi.prototype.set_internalCore = function (value)
 {
    this._internalCore = value;
};
Object.defineProperty(shetab.api.SEEbookApi.prototype, "internalCore", {get: shetab.api.SEEbookApi.prototype.get_internalCore, set: shetab.api.SEEbookApi.prototype.set_internalCore, enumerable: true});
shetab.api.SEEbookApi.prototype.get_core = function ()
 {
    return this._core;
};
shetab.api.SEEbookApi.prototype.set_core = function (value)
 {
    this._core = value;
};
Object.defineProperty(shetab.api.SEEbookApi.prototype, "core", {get: shetab.api.SEEbookApi.prototype.get_core, set: shetab.api.SEEbookApi.prototype.set_core, enumerable: true});
shetab.api.SEEbookApi.prototype.get_propertyBag = function ()
 {
    return this._propertyBag;
};
shetab.api.SEEbookApi.prototype.set_propertyBag = function (value)
 {
    this._propertyBag = value;
};

Object.defineProperty(shetab.api.SEEbookApi.prototype, "propertyBag", {get: shetab.api.SEEbookApi.prototype.get_propertyBag, set: shetab.api.SEEbookApi.prototype.set_propertyBag, enumerable: true});
shetab.SECommandUI = function (commandName, isInvoke)
 {
    this.commandName = null;
    this._isInvoke = null;
    this._isEnabled = null;
    this.commandName = commandName;
    this._isInvoke = isInvoke;
};
shetab.SECommandUI.prototype.get_canInvoke = function ()
 {
    return this._isEnabled && this._isInvoke;
};
Object.defineProperty(shetab.SECommandUI.prototype, "canInvoke", {get: shetab.SECommandUI.prototype.get_canInvoke, enumerable: true});
shetab.SECommandUI.prototype.get_isHandled = function ()
 {
    return this._isEnabled !== null;
};
Object.defineProperty(shetab.SECommandUI.prototype, "isHandled", {get: shetab.SECommandUI.prototype.get_isHandled, enumerable: true});
shetab.SECommandUI.prototype.get_isEnabled = function ()
 {
    return this._isEnabled === true;
};
shetab.SECommandUI.prototype.set_isEnabled = function (value)
 {
    this._isEnabled = value;
};
Object.defineProperty(shetab.SECommandUI.prototype, "isEnabled", {get: shetab.SECommandUI.prototype.get_isEnabled, set: shetab.SECommandUI.prototype.set_isEnabled, enumerable: true});
shetab.SEModule = function ()
 {
    this._storage = null;
    shetab.SEModuleBase.call(this);
};
shetab.SEModule.prototype.get_storage = function ()
 {
    return this._storage;
};
shetab.SEModule.prototype.set_storage = function (value)
 {
    this._storage = value;
};
Object.defineProperty(shetab.SEModule.prototype, "storage", {get: shetab.SEModule.prototype.get_storage, set: shetab.SEModule.prototype.set_storage, enumerable: true});
shetab.SEModule.prototype.load = function (moduleFileUrl, loadHandler)
 {
    this.set_storage(new shetab.storages.SEFileSystemStorage(shetab.common.Uri.combine(moduleFileUrl, "Storage/"), false));
    shetab.SEModuleBase.prototype.load.call(this, moduleFileUrl, loadHandler);
};
shetab.SEModule.prototype.localizeText = function (text)
 {
    return shetab.SEEngine.get_current().localizeText$$String$$SEResourceManager(text, this.get_resourceManager());
};
$Inherit(shetab.SEModule, shetab.SEModuleBase);
shetab.SEModuleEntity = function ()
 {
    this._storage = null;
    this._module = null;
    shetab.SEModuleEntityBase.call(this);
};
shetab.SEModuleEntity.prototype.get_storage = function ()
 {
    return this._storage;
};
shetab.SEModuleEntity.prototype.set_storage = function (value)
 {
    this._storage = value;
};
Object.defineProperty(shetab.SEModuleEntity.prototype, "storage", {get: shetab.SEModuleEntity.prototype.get_storage, set: shetab.SEModuleEntity.prototype.set_storage, enumerable: true});
shetab.SEModuleEntity.prototype.get_module = function ()
 {
    return this._module;
};
shetab.SEModuleEntity.prototype.set_module = function (value)
 {
    this._module = value;
};
Object.defineProperty(shetab.SEModuleEntity.prototype, "module", {get: shetab.SEModuleEntity.prototype.get_module, set: shetab.SEModuleEntity.prototype.set_module, enumerable: true});
shetab.SEModuleEntity.prototype.load = function (fileUrl, loadHandler)
 {
    shetab.SEModuleEntityBase.prototype.load.call(this, fileUrl, $CreateAnonymousDelegate(this, function (success)
    {
        try
        {
            if (!success)
                throw $CreateException(new shetab.common.error.FileLoadError(fileUrl), new Error());
            this.set_module(shetab.SEApp.get_current().get_engine().getModuleById(this.get_moduleId()));
            if (this.get_module() === null)
                throw new Error("Could not find module of moduleEntity! ModuleEntityUrl: " + fileUrl);
            this.set_storage(new shetab.storages.SEFileSystemStorage(shetab.common.Uri.combine(fileUrl, "Storage/"), shetab.SEEngine.get_current().get_isDesignMode()));
            this.get_propertyBag().set_schema(this.get_module().get_propertyBagSchema());
            loadHandler(success);
        }
        catch (err)
        {
            console.error(err.stack);
            loadHandler(false);
        }
    }));
};
$Inherit(shetab.SEModuleEntity, shetab.SEModuleEntityBase);
shetab.SEModuleInstance = function ()
 {
    this.agentVersion = null;
    this.id = null;
    this.url = null;
    this.sessionName = null;
    this.placeholderId = null;
    this.canActive = null;
    this.commandHandler = null;
    this.moduleEntity = null;
    this.module = null;
    this.parentModule = null;
    this.multiPropertyBag = null;
    this.requestedModuleEntity = null;
    this._selectedItems =  [];
    this._lastVirtualPropertySetId = 0;
    this._selectedItem = null;
    this.requestedModuleEntity = new shetab.SEModuleInstance.RequestedModuleEntity(this);
};
shetab.SEModuleInstance.prototype.get_selectedItems = function ()
 {
    return this._selectedItems;
};
shetab.SEModuleInstance.prototype.set_selectedItems = function (value)
 {
    value = (value !== null ? value :  []);
    for (var $i10 = 0, $l10 = value.length, item = value[$i10]; $i10 < $l10; $i10++, item = value[$i10])
    {
        if (item.get_moduleEntityId() === null && this.moduleEntity !== null)
            item.set_moduleEntityId(this.moduleEntity.get_id());
    }
    var moduleManager = shetab.SEEngine.get_current().moduleManager;
    this.requestedModuleEntity.release(null);
    var wait = new shetab.SEWait(value.length);
    for (var $i11 = 0, $l11 = value.length, item = value[$i11]; $i11 < $l11; $i11++, item = value[$i11])
        moduleManager.loadModuleEntityById(item.moduleEntityId, this, $CreateAnonymousDelegate(this, function (entity)
        {
            wait.release();
            if (entity !== null)
                this.requestedModuleEntity.add(entity);
        }));
    this._selectedItems =  [];
    this._selectedItem = null;
    this.multiPropertyBag = null;
    wait.waitAll($CreateAnonymousDelegate(this, function ()
    {
        this._selectedItems = value;
        if (moduleManager.get_activeModuleInstance() === this)
            shetab.SEEngine.get_current().firePropertyChanged$$Array( [shetab.tokens.SEProperty.selectedItem, shetab.tokens.SEProperty.selectedItems]);
    }));
};
Object.defineProperty(shetab.SEModuleInstance.prototype, "selectedItems", {get: shetab.SEModuleInstance.prototype.get_selectedItems, set: shetab.SEModuleInstance.prototype.set_selectedItems, enumerable: true});
shetab.SEModuleInstance.prototype.get_selectedItem = function ()
 {
    if (this._selectedItem !== null)
        return this._selectedItem;
    if (this.get_selectedItems().length === 0)
        return this._selectedItem = null;
    if (this.get_selectedItems().length === 1)
        return this._selectedItem = this.get_selectedItems()[0];
    var items =  [];
    for (var $i12 = 0, $t12 = this.get_selectedItems(), $l12 = $t12.length, item = $t12[$i12]; $i12 < $l12; $i12++, item = $t12[$i12])
        items.push((function ()
        {
            var $v45 = new shetab.SEMultiPropertyBag.Item();
            $v45.itemId = item.itemId;
            $v45.moduleEntity = this.requestedModuleEntity.find(item.moduleEntityId);
            $v45.propertySetId = item.propertySetId;
            return $v45;
        }).call(this));
    var virtualPropertySetId = shetab.SEMultiPropertyBag.c_multiPropertySetIdPrefix + (++this._lastVirtualPropertySetId).toString();
    this.multiPropertyBag = new shetab.SEMultiPropertyBag(items, virtualPropertySetId);
    return this._selectedItem = (function ()
    {
        var $v46 = new shetab.api.SESelectedItem();
        $v46.set_itemId(shetab.SEPropertyBag.c_mainItemId);
        $v46.set_moduleEntityId(shetab.SEMultiPropertyBag.c_multiEntityPrefix + this.id);
        $v46.set_propertySetId(virtualPropertySetId);
        return $v46;
    }).call(this);
};

Object.defineProperty(shetab.SEModuleInstance.prototype, "selectedItem", {get: shetab.SEModuleInstance.prototype.get_selectedItem, enumerable: true});
if (typeof(shetab.SEModuleInstance) == "undefined")
    shetab.SEModuleInstance = {};
shetab.SEModuleInstance.RequestedModuleEntity = function (moduleInstance)
 {
    this._requestedModuleEntities = new Object();
    this._moduleInstance = null;
    this._moduleInstance = moduleInstance;
};
shetab.SEModuleInstance.RequestedModuleEntity.prototype.add = function (value)
 {
    if (value !== null)
        this._requestedModuleEntities[value.get_id()] = value;
};
shetab.SEModuleInstance.RequestedModuleEntity.prototype.release = function (moduleEntityId)
 {
    if (moduleEntityId === null)
        this._requestedModuleEntities = new Object();
    else
        delete this._requestedModuleEntities[moduleEntityId];
};
shetab.SEModuleInstance.RequestedModuleEntity.prototype.find = function (moduleEntityId)
 {
    if (this._moduleInstance.moduleEntity !== null && this._moduleInstance.moduleEntity.get_id() === moduleEntityId)
        return this._moduleInstance.moduleEntity;
    return this._requestedModuleEntities !== null ? shetab.common.Utility.checkUndefined(this._requestedModuleEntities[moduleEntityId], null) : null;
};
shetab.SEModuleManager = function ()
 {
    this._activeModuleInstance = null;
    this._activateTimerHandle = 0;
    this._modulePlaceholders = null;
    this._moduleInstances = null;
    this._lastModuleInstanceId = null;
    this._mainViewModuleInstance = null;
    this._lastModuleInstanceId = 0;
    this._modulePlaceholders = new Object();
    this._moduleInstances = new Object();
};
shetab.SEModuleManager.prototype.getModuleInstanceById = function (instanceId)
 {
    return shetab.common.Utility.checkUndefined(this._moduleInstances[instanceId], null);
};
shetab.SEModuleManager.prototype.loadModuleEntityById = function (moduleEntityId, owner, loadHandler)
 {
    var entity = this.getModuleEntityFromLoadedModuleEntities(moduleEntityId, owner);
    if (entity !== null)
    {
        loadHandler(entity);
    }
    else
    {
        var moduleEntity = new shetab.SEModuleEntity();
        moduleEntity.load(moduleEntityId, $CreateAnonymousDelegate(this, function (success)
        {
            if (!success)
            {
                loadHandler(null);
                return;
            }
            if (owner !== null)
                owner.requestedModuleEntity.add(moduleEntity);
            loadHandler(moduleEntity);
        }));
    }
};
shetab.SEModuleManager.prototype.getModuleEntityFromLoadedModuleEntities = function (moduleEntityId, owner)
 {
    for (var instanceId in this._moduleInstances)
    {
        var entity = this.getModuleInstanceById(instanceId).requestedModuleEntity.find(moduleEntityId);
        if (entity === null)
            continue;
        if (owner !== null)
            owner.requestedModuleEntity.add(entity);
        return entity;
    }
    for (var placeholderId in this._modulePlaceholders)
    {
        var entity = this._modulePlaceholders[placeholderId].moduleEntity;
        if (entity === null || entity.get_id() !== moduleEntityId)
            continue;
        if (owner !== null)
            owner.requestedModuleEntity.add(entity);
        return entity;
    }
    return null;
};
shetab.SEModuleManager.prototype.getPropertyBagFromLoadedModuleEntities = function (moduleEntityId, owner)
 {
    var tokenize = moduleEntityId.split(shetab.SEMultiPropertyBag.c_multiEntityPrefix);
    var multiPropBagModuleInstance = tokenize.length > 1 ? this.getModuleInstanceById(tokenize[1]) : null;
    if (multiPropBagModuleInstance !== null)
        return multiPropBagModuleInstance.multiPropertyBag;
    var moduleEntity = this.getModuleEntityFromLoadedModuleEntities(moduleEntityId, owner);
    return moduleEntity !== null ? moduleEntity.get_propertyBag() : null;
};
shetab.SEModuleManager.prototype.get_mainViewModuleInstance = function ()
 {
    return this._mainViewModuleInstance;
};
shetab.SEModuleManager.prototype.set_mainViewModuleInstance = function (value)
 {
    this._mainViewModuleInstance = value;
};
Object.defineProperty(shetab.SEModuleManager.prototype, "mainViewModuleInstance", {get: shetab.SEModuleManager.prototype.get_mainViewModuleInstance, set: shetab.SEModuleManager.prototype.set_mainViewModuleInstance, enumerable: true});
shetab.SEModuleManager.prototype.get_soundModuleInstance = function ()
 {
    return null;
};
Object.defineProperty(shetab.SEModuleManager.prototype, "soundModuleInstance", {get: shetab.SEModuleManager.prototype.get_soundModuleInstance, enumerable: true});
shetab.SEModuleManager.prototype.get_activeModuleInstance = function ()
 {
    return this._activeModuleInstance;
};
shetab.SEModuleManager.prototype.set_activeModuleInstance = function (value)
 {
    (function ()
    {
        this._activeModuleInstance = {Value: this._activeModuleInstance};
        var $res = shetab.SEEngine.get_current().updateProperty$1$$T$$T$$Array(this._activeModuleInstance, value,  [shetab.tokens.SEProperty.isActiveModule, shetab.tokens.SEProperty.isContainsActiveModule, shetab.tokens.SEProperty.selectedItem, shetab.tokens.SEProperty.selectedItems]);
        this._activeModuleInstance = this._activeModuleInstance.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SEModuleManager.prototype, "activeModuleInstance", {get: shetab.SEModuleManager.prototype.get_activeModuleInstance, set: shetab.SEModuleManager.prototype.set_activeModuleInstance, enumerable: true});
shetab.SEModuleManager.prototype.activateModule = function (moduleInstanceId, value)
 {
    var moduleInstance = this.getModuleInstanceById(moduleInstanceId);
    if (this._activateTimerHandle !== 0)
        clearTimeout(this._activateTimerHandle);
    if (moduleInstance.canActive)
    {
        var newActiveModule = value ? moduleInstance : null;
        this._activateTimerHandle = setTimeout($CreateAnonymousDelegate(this, function ()
        {
            this.set_activeModuleInstance(newActiveModule);
        }));
    }
};
shetab.SEModuleManager.prototype.get_moduleInstances = function ()
 {
    return this._moduleInstances;
};
Object.defineProperty(shetab.SEModuleManager.prototype, "moduleInstances", {get: shetab.SEModuleManager.prototype.get_moduleInstances, enumerable: true});
shetab.SEModuleManager.prototype.findModuleInstanceByModulePlaceholderId = function (modulePlaceholderId)
 {
    for (var instanceId in this._moduleInstances)
    {
        var moduleInstance = this.getModuleInstanceById(instanceId);
        if (moduleInstance.placeholderId === modulePlaceholderId)
            return moduleInstance;
    }
    return null;
};
shetab.SEModuleManager.prototype.openDocument = function (documentUrl, pageNumber, bookmark, placeholderId, useModuleController)
 {
    var placeholder = (function ()
    {
        var $v47 = new shetab.SEModuleManager.ModulePlaceholder();
        $v47.documentUrl = documentUrl;
        $v47.pageNumber = pageNumber;
        $v47.bookmark = bookmark;
        $v47.playerUrl = shetab.SEEngine.get_current().getPlayerEntityUrl(documentUrl);
        return $v47;
    }).call(this);
    var isModuleEntity = shetab.common.Uri.getFileName(placeholder.playerUrl).toLowerCase() === shetab.SEGlobal.filename_moduleEntity.toLowerCase();
    if (isModuleEntity)
    {
        this.loadModuleEntityById(placeholder.playerUrl, null , $CreateAnonymousDelegate(this, function (moduleEntity)
        {
            if (moduleEntity === null)
                throw new Error("Could not load module Entity. ModuleEntityUrl: " + placeholder.playerUrl);
            placeholderId = (placeholderId !== null ? placeholderId : moduleEntity.get_module().get_placeholderId());

            placeholder.moduleEntity = moduleEntity;
            placeholder.playerUrl = moduleEntity.get_module().get_fileUrl();
            this._modulePlaceholders[placeholderId] = placeholder;
            this.initializeModulePlaceholder(placeholderId);
        }));
        return;
    }
    this._modulePlaceholders[placeholderId] = placeholder;
    this.initializeModulePlaceholder(placeholderId);
};
shetab.SEModuleManager.prototype.addModulePlaceholder = function (placeholderId)
 {
    this.initializeModulePlaceholder(placeholderId);
};
shetab.SEModuleManager.prototype.initializeModulePlaceholder = function (placeholderId)
 {
    var placeholder = this._modulePlaceholders[placeholderId];
    if (placeholder === undefined)
        return;
    var moduleInstance = this.findModuleInstanceByModulePlaceholderId(placeholderId);
    if (moduleInstance !== null && placeholder.moduleEntity !== null && moduleInstance.moduleEntity === placeholder.moduleEntity)
    {
        var documentCommandHandler = moduleInstance.commandHandler.get_documentCommandHandler();
        if (documentCommandHandler !== null)
        {
            try
            {
                documentCommandHandler.open(placeholder.documentUrl, placeholder.pageNumber, placeholder.bookmark);
                return;
            }
            catch ($$e1)
            {
            }
        }
    }
    var api = new shetab.api.SEAgent();
    api.initializeModulePlaceholder(placeholderId, placeholder.playerUrl);
};
shetab.SEModuleManager.prototype.initializeCommandHandler = function (instanceId, interfaces)
 {
    var moduleInstance = this.getModuleInstanceById(instanceId);
    if (!shetab.common.Utility.isDefined(moduleInstance))
        throw new Error("commandHandlerInitialized called but moduleInstance not exists. instanceId: " + instanceId);
    moduleInstance.commandHandler = new shetab.commandHandlers.SEModuleCommandHandler(instanceId, interfaces);
    var modulePlaceholder = this._modulePlaceholders[moduleInstance.placeholderId];
    if (shetab.common.Utility.isDefined(modulePlaceholder))
    {
        var documentHandler = moduleInstance.commandHandler.get_documentCommandHandler();
        if (documentHandler !== null)
            documentHandler.open(modulePlaceholder.documentUrl, modulePlaceholder.pageNumber, modulePlaceholder.bookmark);
    }
};
shetab.SEModuleManager.prototype.initializeModule = function (agentVersion, url, parentInstanceId, placeholderId, sessionName)
 {
    var placeholder = this._modulePlaceholders[placeholderId];
    if (placeholder === undefined || shetab.common.Uri.getFileName(url).toLowerCase() !== shetab.common.Uri.getFileName(placeholder.playerUrl).toLowerCase())
        placeholder = new shetab.SEModuleManager.ModulePlaceholder();
    var instanceId = (++this._lastModuleInstanceId).toString();
    var moduleInstance = (function ()
    {
        var $v48 = new shetab.SEModuleInstance();
        $v48.agentVersion = agentVersion;
        $v48.id = instanceId;
        $v48.url = url;
        $v48.placeholderId = placeholderId;
        $v48.moduleEntity = placeholder.moduleEntity;
        $v48.parentModule = this.getModuleInstanceById(parentInstanceId);
        $v48.canActive = placeholderId === null || placeholderId.toLowerCase() !== shetab.SEGlobal.placeolderId_skin.toLowerCase();
        $v48.sessionName = sessionName !== null && sessionName !== "" ? sessionName : instanceId;
        return $v48;
    }).call(this);
    this._moduleInstances[instanceId] = moduleInstance;
    if (placeholderId !== null && placeholderId.toLowerCase() === "mainview")
    {
        this.set_mainViewModuleInstance(moduleInstance);
        shetab.SEEngine.get_current().firePropertyChanged$$Object(shetab.tokens.SEProperty.zoomMode);
    }
    return instanceId;
};
shetab.SEModuleManager.prototype.uninitializeModule = function (instanceId)
 {
    delete this._moduleInstances[instanceId];
};
shetab.SEModuleManager.prototype.isActiveModuleInstance = function (moduleInstanceId)
 {
    return this.getModuleInstanceById(moduleInstanceId) === shetab.SEEngine.get_current().moduleManager.get_activeModuleInstance();
};
shetab.SEModuleManager.prototype.isContainsActiveModule = function (moduleInstanceId)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
if (typeof(shetab.SEModuleManager) == "undefined")
    shetab.SEModuleManager = {};
shetab.SEModuleManager.ModulePlaceholder = function ()
 {
    this.documentUrl = null;
    this.pageNumber = null;
    this.bookmark = null;
    this.playerUrl = null;
    this.moduleEntity = null;
};
if (typeof(shetab.config) == "undefined")
    shetab.config = {};
shetab.config.SEConfig = function (configUrl)
 {
    this.resourceUrls = new Object();
    this.moduleUrls =  [];
    this.startupModuleEntityUrls =  [];
    this.playerModuleEntityUrls =  [];
    this.modules =  [];
    this.playerModuleEntities =  [];
    this._configUrl = null;
    this._baseCulture = null;
    this.set_configUrl(configUrl);
};
shetab.config.SEConfig.prototype.get_configUrl = function ()
 {
    return this._configUrl;
};
shetab.config.SEConfig.prototype.set_configUrl = function (value)
 {
    this._configUrl = value;
};
Object.defineProperty(shetab.config.SEConfig.prototype, "configUrl", {get: shetab.config.SEConfig.prototype.get_configUrl, set: shetab.config.SEConfig.prototype.set_configUrl, enumerable: true});
shetab.config.SEConfig.prototype.get_rootFolderUrl = function ()
 {
    return shetab.common.Uri.getParent(shetab.common.Uri.getParent(this.get_configUrl())) + "/";
};
Object.defineProperty(shetab.config.SEConfig.prototype, "rootFolderUrl", {get: shetab.config.SEConfig.prototype.get_rootFolderUrl, enumerable: true});
shetab.config.SEConfig.prototype.get_resourcesFolderUrl = function ()
 {
    return shetab.common.Uri.combine(this.get_configUrl(), "Resources/FolderInfo.xml");
};
Object.defineProperty(shetab.config.SEConfig.prototype, "resourcesFolderUrl", {get: shetab.config.SEConfig.prototype.get_resourcesFolderUrl, enumerable: true});
shetab.config.SEConfig.prototype.get_baseCulture = function ()
 {
    return this._baseCulture;
};
shetab.config.SEConfig.prototype.set_baseCulture = function (value)
 {
    this._baseCulture = value;
};
Object.defineProperty(shetab.config.SEConfig.prototype, "baseCulture", {get: shetab.config.SEConfig.prototype.get_baseCulture, set: shetab.config.SEConfig.prototype.set_baseCulture, enumerable: true});
shetab.config.SEConfig.prototype.getSerializationInfo = function (info, context)
 {
    info.addString("baseCulture").set_rootElementName("resources");
    var modulesPI = info.addArray("moduleUrls",  String, "module");
    modulesPI.set_collectionElementName("modules");
    modulesPI.itemInfo.set_attributeName("url");
    var playersPI = info.addArray("playerModuleEntityUrls",  String, "playerModuleEntity");
    playersPI.set_collectionElementName("playerModuleEntities");
    playersPI.itemInfo.set_attributeName("url");
    var startupPI = info.addArray("startupModuleEntityUrls",  String, "startupModuleEntity");
    startupPI.set_collectionElementName("startupModuleEntities");
    startupPI.itemInfo.set_attributeName("url");
};
shetab.config.SEConfig.prototype.load = function (loadHandler)
 {
    var wait = new shetab.SEWait(2);
    shetab.SEUtility.loadFile(this.get_configUrl(), $CreateAnonymousDelegate(this, function (httpRequest)
    {
        if (!shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status))
        {
            wait.release();
            return;
        }
        shetab.common.serialization.Serializer.deserialize(this, httpRequest.responseXML.documentElement);
        this.set_baseCulture(new shetab.common.CultureInfo(this.get_baseCulture()).get_name());

        for (var i = 0; i < this.moduleUrls.length; i++)
            this.moduleUrls[i] = shetab.common.Uri.combine(this.get_configUrl(), this.moduleUrls[i]);
        for (var i = 0; i < this.startupModuleEntityUrls.length; i++)
            this.startupModuleEntityUrls[i] = shetab.common.Uri.combine(this.get_configUrl(), this.startupModuleEntityUrls[i]);
        for (var i = 0; i < this.playerModuleEntityUrls.length; i++)
            this.playerModuleEntityUrls[i] = shetab.common.Uri.combine(this.get_configUrl(), this.playerModuleEntityUrls[i]);
        wait.release();
    }));
    shetab.SEUtility.loadFile(this.get_resourcesFolderUrl(), $CreateAnonymousDelegate(this, function (httpRequest)
    {
        if (!shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status))
        {
            wait.release();
            return;
        }
        var foldeInfo = new shetab.SEFolderInfo();
        shetab.common.serialization.Serializer.deserialize(foldeInfo, httpRequest.responseXML.documentElement);
        for (var $i13 = 0, $t13 = foldeInfo.get_folders(), $l13 = $t13.length, folder = $t13[$i13]; $i13 < $l13; $i13++, folder = $t13[$i13])
            this.resourceUrls[new shetab.common.CultureInfo(folder).get_name()] = shetab.common.Uri.combine(this.get_resourcesFolderUrl(), folder + "/" + shetab.SEGlobal.filename_resourceInfo);
        wait.release();
    }));
    wait.waitAll($CreateAnonymousDelegate(this, function ()
    {
        loadHandler(true);
    }));
};
shetab.config.SEConfig.prototype.loadMoudles = function (loadHandler)
 {
    var wait = new shetab.SEWait(this.moduleUrls.length);
    for (var $i14 = 0, $t14 = this.moduleUrls, $l14 = $t14.length, moduleUrl = $t14[$i14]; $i14 < $l14; $i14++, moduleUrl = $t14[$i14])
    {
        var module = new shetab.SEModule();
        module.load(moduleUrl, shetab.SEUtility.loadHandler$1(module, $CreateAnonymousDelegate(this, function (success, context)
        {
            if (success)
                this.modules.push(context);
            wait.release();
        })));
    }
    wait.waitAll($CreateAnonymousDelegate(this, function ()
    {
        loadHandler(true);
    }));
};
shetab.config.SEConfig.prototype.loadModuleEntities = function (loadHandler)
 {
    var wait = new shetab.SEWait(this.playerModuleEntityUrls.length);
    for (var $i15 = 0, $t15 = this.playerModuleEntityUrls, $l15 = $t15.length, url = $t15[$i15]; $i15 < $l15; $i15++, url = $t15[$i15])
    {
        var moduleEntitiy = new shetab.SEModuleEntity();
        moduleEntitiy.load(url, shetab.SEUtility.loadHandler$1(moduleEntitiy, $CreateAnonymousDelegate(this, function (success, context)
        {
            if (success)
                this.playerModuleEntities.push(context);
            wait.release();
        })));
    }
    wait.waitAll($CreateAnonymousDelegate(this, function ()
    {
        loadHandler(true);
    }));
};
shetab.commandHandlers.SEModuleZoomCommandHandler = function (zoomHandler)
 {
    this._zoomHandler = null;
    this._zoomHandler = zoomHandler;
};
shetab.commandHandlers.SEModuleZoomCommandHandler.autoZoomTable =  [0.25, 0.33, 0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5];
shetab.commandHandlers.SEModuleZoomCommandHandler.getNextAutoZoom = function (currentZoom)
 {
    for (var i = 0; i < shetab.commandHandlers.SEModuleZoomCommandHandler.autoZoomTable.length; i++)
        if (currentZoom < shetab.commandHandlers.SEModuleZoomCommandHandler.autoZoomTable[i])
            return shetab.commandHandlers.SEModuleZoomCommandHandler.autoZoomTable[i];
    return 0;
};
shetab.commandHandlers.SEModuleZoomCommandHandler.getPrevAutoZoom = function (currentZoom)
 {
    for (var i = shetab.commandHandlers.SEModuleZoomCommandHandler.autoZoomTable.length - 1; i >= 0; i--)
        if (currentZoom > shetab.commandHandlers.SEModuleZoomCommandHandler.autoZoomTable[i])
            return shetab.commandHandlers.SEModuleZoomCommandHandler.autoZoomTable[i];
    return 0;
};
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.get_canZoomIn = function ()
 {
    try
    {
        return this._zoomHandler.canZoomIn;
    }
    catch (err)
    {
        if (!shetab.SEUtility.isDoDefaultError(err))
            throw err;
        var nextZoom = shetab.commandHandlers.SEModuleZoomCommandHandler.getNextAutoZoom(this._zoomHandler.zoom);
        return nextZoom !== 0 && this._zoomHandler.canSetZoom(nextZoom);
    }
};
Object.defineProperty(shetab.commandHandlers.SEModuleZoomCommandHandler.prototype, "canZoomIn", {get: shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.get_canZoomIn, enumerable: true});
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.get_canZoomOut = function ()
 {
    try
    {
        return this._zoomHandler.canZoomOut;
    }
    catch (err)
    {
        if (!shetab.SEUtility.isDoDefaultError(err))
            throw err;
        var prevZoom = shetab.commandHandlers.SEModuleZoomCommandHandler.getPrevAutoZoom(this._zoomHandler.zoom);
        return prevZoom !== 0 && this._zoomHandler.canSetZoom(prevZoom);
    }
};
Object.defineProperty(shetab.commandHandlers.SEModuleZoomCommandHandler.prototype, "canZoomOut", {get: shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.get_canZoomOut, enumerable: true});
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.get_zoom = function ()
 {
    return this._zoomHandler.zoom;
};
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.set_zoom = function (value)
 {
    this._zoomHandler.zoom = value;
};
Object.defineProperty(shetab.commandHandlers.SEModuleZoomCommandHandler.prototype, "zoom", {get: shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.get_zoom, set: shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.set_zoom, enumerable: true});
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.get_zoomMode = function ()
 {
    var ret = this._zoomHandler.zoomMode;
    try
    {
        if (ret === "custom" && this.get_zoom() === 1)
            return "actualSize";
    }
    catch ($$e2)
    {
    }
    return ret;
};
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.set_zoomMode = function (value)
 {
    this._zoomHandler.zoomMode = value;
    shetab.SEEngine.get_current().updateUI();
};
Object.defineProperty(shetab.commandHandlers.SEModuleZoomCommandHandler.prototype, "zoomMode", {get: shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.get_zoomMode, set: shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.set_zoomMode, enumerable: true});
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.canSetZoom = function (value)
 {
    return this._zoomHandler.canSetZoom(value);
};
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.canSetZoomMode = function (value)
 {
    return this._zoomHandler.canSetZoomMode(value);
};
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.zoomIn = function ()
 {
    try
    {
        this._zoomHandler.zoomIn();
        shetab.SEEngine.get_current().updateUI();
    }
    catch (err)
    {
        if (!shetab.SEUtility.isDoDefaultError(err))
            throw err;
        var nextZoom = shetab.commandHandlers.SEModuleZoomCommandHandler.getNextAutoZoom(this._zoomHandler.zoom);
        if (nextZoom !== 0)
            this._zoomHandler.zoom = nextZoom;
    }
};
shetab.commandHandlers.SEModuleZoomCommandHandler.prototype.zoomOut = function ()
 {
    try
    {
        this._zoomHandler.zoomOut();
        shetab.SEEngine.get_current().updateUI();
    }
    catch (err)
    {
        if (!shetab.SEUtility.isDoDefaultError(err))
            throw err;
        var prevZoom = shetab.commandHandlers.SEModuleZoomCommandHandler.getPrevAutoZoom(this._zoomHandler.zoom);
        if (prevZoom !== 0)
            this._zoomHandler.zoom = prevZoom;
    }
};

shetab.SEMultiPropertyBag = function (items, mainPropertySetId)
 {
    this._virtualPropertyNames = new Object();
    this._lastPropertyIndex = 0;
    this.items =  [];
    this._mainPropertySetId = null;
    this._schema = null;
    this.items = items;
    this.set_mainPropertySetId(mainPropertySetId);
    this.createSchema();
};
shetab.SEMultiPropertyBag.c_multiPropertySetIdPrefix = "$$multiPropertySet.";
shetab.SEMultiPropertyBag.c_multiEntityPrefix = "$$multiPropertyBag.";
shetab.SEMultiPropertyBag.prototype.get_mainPropertySetId = function ()
 {
    return this._mainPropertySetId;
};
shetab.SEMultiPropertyBag.prototype.set_mainPropertySetId = function (value)
 {
    this._mainPropertySetId = value;
};
Object.defineProperty(shetab.SEMultiPropertyBag.prototype, "mainPropertySetId", {get: shetab.SEMultiPropertyBag.prototype.get_mainPropertySetId, set: shetab.SEMultiPropertyBag.prototype.set_mainPropertySetId, enumerable: true});
shetab.SEMultiPropertyBag.prototype.createSchema = function ()
 {
    var newSchema = new shetab.SEPropertyBagSchema();
    var newPropertySet = new shetab.SEPropertyBagSchema.PropertySet();
    var addedPropertySets =  [];
    newSchema.propertySets[this.get_mainPropertySetId()] = newPropertySet;
    var moduleNames =  [];
    var propSetNames =  [];
    for (var $i16 = 0, $t16 = this.items, $l16 = $t16.length, item = $t16[$i16]; $i16 < $l16; $i16++, item = $t16[$i16])
    {
        var title = item.moduleEntity.get_module().get_title();
        if (moduleNames.indexOf(title) === -1)
            moduleNames.push(title);
        var setName = item.moduleEntity.get_propertyBag().get_schema().propertySets[item.propertySetId].get_title();
        if (propSetNames.indexOf(setName) === -1)
            propSetNames.push(setName);
    }
    newPropertySet.set_title((moduleNames.length > 1) ? moduleNames.join(",") : propSetNames.join(","));
    for (var $i17 = 0, $t17 = this.items, $l17 = $t17.length, item = $t17[$i17]; $i17 < $l17; $i17++, item = $t17[$i17])
    {
        var bagSchema = item.moduleEntity.get_propertyBag().get_schema();
        var propertySet = shetab.common.Utility.checkUndefined(bagSchema.propertySets[item.propertySetId], null);
        if (propertySet === null)
            continue;
        var propertyPrefix = item.moduleEntity.get_module().get_id() + ".$$" + item.propertySetId + ".$$";
        if (addedPropertySets.indexOf(propertyPrefix) !== -1)
            continue;
        addedPropertySets.push(propertyPrefix);
        for (var propertyName in propertySet.properties)
        {
            var property = propertySet.properties[propertyName];
            if (!property.canMultiSelect)
                continue;
            var newProperty = property.clone();
            if (propSetNames.length > 1)
                newProperty.category = propertySet.get_title() + ">" + newProperty.category;
            if (moduleNames.length > 1)
                newProperty.category = item.moduleEntity.get_module().get_title() + ">" + newProperty.category;
            var newPropertyName = "property" + (++this._lastPropertyIndex);
            this._virtualPropertyNames[newPropertyName] = (function ()
            {
                var $v49 = new shetab.SEMultiPropertyBag.VirtualProperty();
                $v49.moduleId = item.moduleEntity.get_module().get_id();
                $v49.propertySetId = item.propertySetId;
                $v49.propertyName = propertyName;
                return $v49;
            }).call(this);
            newPropertySet.properties[newPropertyName] = newProperty;
        }
    }
    this.set_schema(newSchema);
};
shetab.SEMultiPropertyBag.prototype.get_schema = function ()
 {
    return this._schema;
};
shetab.SEMultiPropertyBag.prototype.set_schema = function (value)
 {
    this._schema = value;
};
Object.defineProperty(shetab.SEMultiPropertyBag.prototype, "schema", {get: shetab.SEMultiPropertyBag.prototype.get_schema, set: shetab.SEMultiPropertyBag.prototype.set_schema, enumerable: true});
shetab.SEMultiPropertyBag.prototype.checkRequest = function (itemId, propertySetId)
 {
    if (itemId === null || itemId === "")
        itemId = shetab.SEPropertyBag.c_mainItemId;
    if (propertySetId === null || propertySetId === "")
        propertySetId = shetab.SEPropertyBag.c_mainPropertySetId;
    if (propertySetId !== this.get_mainPropertySetId())
        throw new Error("Could not find propertySetId in this MultiPropertyBag. propertySetId: " + propertySetId);
    if (itemId !== shetab.SEPropertyBag.c_mainItemId)
        throw new Error("Could not find itemId in this MultiPropertyBag. itemId: " + itemId);
};
shetab.SEMultiPropertyBag.prototype.getProperty = function (propertyName, itemId, propertySetId)
 {
    this.checkRequest(itemId, propertySetId);
    var vproperty = this._virtualPropertyNames[propertyName];
    if (!shetab.common.Utility.isDefined(vproperty))
        throw new Error("Could not find propertyName in this MultiPropertyBag. propertyName: " + propertyName);
    var type = this.get_schema().propertySets[propertySetId].properties[propertyName].type;
    var value = null;
    for (var $i18 = 0, $t18 = this.items, $l18 = $t18.length, item = $t18[$i18]; $i18 < $l18; $i18++, item = $t18[$i18])
    {
        if (item.moduleEntity.get_moduleId() !== vproperty.moduleId || item.propertySetId !== vproperty.propertySetId)
            continue;
        var itemValue = item.moduleEntity.get_propertyBag().getProperty(vproperty.propertyName, item.itemId, vproperty.propertySetId);
        if (value === null)
            value = itemValue;
        if (itemValue !== value)
        {
            value = null;
            break;
        }
    }
    return (value !== null ? value : type + "," + shetab.SEMessage.c_null);
};
shetab.SEMultiPropertyBag.prototype.setProperty = function (propertyName, value, itemId, propertySetId)
 {
    this.checkRequest(itemId, propertySetId);
    var vproperty = this._virtualPropertyNames[propertyName];
    if (!shetab.common.Utility.isDefined(vproperty))
        throw new Error("Could not find propertyName in this MultiPropertyBag. propertyName: " + propertyName);
    var isChanged = false;
    for (var $i19 = 0, $t19 = this.items, $l19 = $t19.length, item = $t19[$i19]; $i19 < $l19; $i19++, item = $t19[$i19])
    {
        if (item.moduleEntity.get_moduleId() !== vproperty.moduleId || item.propertySetId !== vproperty.propertySetId)
            continue;
        if (item.moduleEntity.get_propertyBag().setProperty(vproperty.propertyName, value, item.itemId, vproperty.propertySetId))
        {
            shetab.SEEngine.get_current().firePropertyBagChanged((function ()
            {
                var $v50 = new shetab.api.SEPropertyBagItemProperty();
                $v50.set_itemId(item.itemId);
                $v50.set_propertySetId(vproperty.propertySetId);
                $v50.set_propertyName(vproperty.propertyName);
                $v50.set_moduleEntityId(item.moduleEntity.get_id());
                return $v50;
            }).call(this));
            isChanged = true;
        }
    }
    return isChanged;
};
shetab.SEMultiPropertyBag.prototype.getProperties = function (itemId, propertySetId)
 {
    this.checkRequest(itemId, propertySetId);
    var ret = new Object();
    var schemaPropertySet = this.get_schema().propertySets[propertySetId];
    for (var propertyName in schemaPropertySet.properties)
        ret[propertyName] = this.getProperty(propertyName, itemId, propertySetId);
    return ret;
};
shetab.SEMultiPropertyBag.prototype.removeItem = function (itemId, propertySetId)
 {
    throw $CreateException(new shetab.common.error.NotSupportedError(), new Error());
};
shetab.SEMultiPropertyBag.prototype.getItems = function (propertySetId)
 {
    return  [shetab.SEPropertyBag.c_mainItemId];
};

shetab.SEMultiPropertyBag.prototype.resetProperty = function (propertyName, itemId, propertySetId)
 {
    return this.setProperty(propertyName, shetab.SEPropertyBag.c_resetValue, itemId, propertySetId);
};
shetab.SEMultiPropertyBag.prototype.resetAllProperties = function (itemId, propertySetId)
 {
    var ret = false;
    var schemaPropertySet = this.get_schema().propertySets[propertySetId];
    for (var propertyName in schemaPropertySet.properties)
        ret |= this.resetProperty(propertyName, itemId, propertySetId);
    return ret;
};
if (typeof(shetab.SEMultiPropertyBag) == "undefined")
    shetab.SEMultiPropertyBag = {};
shetab.SEMultiPropertyBag.Item = function ()
 {
    this.moduleEntity = null;
    this.itemId = null;
    this.propertySetId = null;
};
shetab.SEMultiPropertyBag.VirtualProperty = function ()
 {
    this.moduleId = null;
    this.propertySetId = null;
    this.propertyName = null;
};
shetab.SEEngine = function ()
 {
    this.projectRequests =  [];
    this.resourceManager = new shetab.SEResourceManager();
    this.moduleManager = new shetab.SEModuleManager();
    this.startupInfo = new shetab.SEStartupInfo();
    this.commandHandler = new shetab.commandHandlers.SEEngineCommandHandler();
    this._searchQuery = null;
    this._firePropertyTimerId = 0;
    this._changedProperties =  [];
    this._firePropertyBagTimerId = 0;
    this._propertyBagChangeSetId = 1;
    this._propertyBagChangeSet = new Object();
    this._oldCommandHandlerStates = new shetab.SEEngine.CommandHandlerStates();
    this.isLogEnabled = true;
    this.ready = null;
    this.propertyChanged = null;
    this._isDesignMode = null;
    this._profileFolderUrl = null;
    this._options = null;
    this._messageParser = null;
    this._modules = null;
    this._config = null;
    this._navigationPaneLock = false;
    this._fullView = false;
    this._project = null;
    if (shetab.SEEngine.get_current() !== null)
        throw new Error("Only one SEApp can be created!");
    shetab.SEEngine.set_current(this);
    this.set_modules(new Object());
    this.add_ready($CreateDelegate(this, this.onReady));
};
shetab.SEEngine._current = null;
shetab.SEEngine.prototype.get_isDesignMode = function ()
 {
    return this._isDesignMode;
};
shetab.SEEngine.prototype.set_isDesignMode = function (value)
 {
    this._isDesignMode = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "isDesignMode", {get: shetab.SEEngine.prototype.get_isDesignMode, set: shetab.SEEngine.prototype.set_isDesignMode, enumerable: true});
shetab.SEEngine.prototype.get_profileFolderUrl = function ()
 {
    return this._profileFolderUrl;
};
shetab.SEEngine.prototype.set_profileFolderUrl = function (value)
 {
    this._profileFolderUrl = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "profileFolderUrl", {get: shetab.SEEngine.prototype.get_profileFolderUrl, set: shetab.SEEngine.prototype.set_profileFolderUrl, enumerable: true});
shetab.SEEngine.prototype.get_options = function ()
 {
    return this._options;
};
shetab.SEEngine.prototype.set_options = function (value)
 {
    this._options = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "options", {get: shetab.SEEngine.prototype.get_options, set: shetab.SEEngine.prototype.set_options, enumerable: true});
shetab.SEEngine.prototype.get_messageParser = function ()
 {
    return this._messageParser;
};
shetab.SEEngine.prototype.set_messageParser = function (value)
 {
    this._messageParser = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "messageParser", {get: shetab.SEEngine.prototype.get_messageParser, set: shetab.SEEngine.prototype.set_messageParser, enumerable: true});
shetab.SEEngine.prototype.get_modules = function ()
 {
    return this._modules;
};
shetab.SEEngine.prototype.set_modules = function (value)
 {
    this._modules = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "modules", {get: shetab.SEEngine.prototype.get_modules, set: shetab.SEEngine.prototype.set_modules, enumerable: true});
shetab.SEEngine.prototype.get_mediaId = function ()
 {
    return "{Test-Media-Id}";
};
Object.defineProperty(shetab.SEEngine.prototype, "mediaId", {get: shetab.SEEngine.prototype.get_mediaId, enumerable: true});
shetab.SEEngine.prototype.getPlayerEntityUrl = function (documentUrl)
 {
    if (shetab.common.Uri.getFileName(documentUrl).toLowerCase() === shetab.SEGlobal.filename_moduleEntity.toLowerCase())
        return documentUrl;
    var fileExtension = shetab.common.Uri.getExtension(documentUrl).toLowerCase();
    for (var $i20 = 0, $t20 = this.get_config().playerModuleEntities, $l20 = $t20.length, player = $t20[$i20]; $i20 < $l20; $i20++, player = $t20[$i20])
    {
        var fileTypes = player.get_module().get_playerFileTypes();
        if (fileTypes !== null && fileTypes.indexOf(fileExtension) !== -1)
            return player.get_url();
    }
    return documentUrl;
};
shetab.SEEngine.prototype.get_startupModuleEntityUrls = function ()
 {
    var ret =  [];
    for (var $i21 = 0, $t21 = this.get_config().startupModuleEntityUrls, $l21 = $t21.length, startupModuleEntityUrl = $t21[$i21]; $i21 < $l21; $i21++, startupModuleEntityUrl = $t21[$i21])
        ret.push(startupModuleEntityUrl);
    return ret;
};
Object.defineProperty(shetab.SEEngine.prototype, "startupModuleEntityUrls", {get: shetab.SEEngine.prototype.get_startupModuleEntityUrls, enumerable: true});
shetab.SEEngine.prototype.add_ready = function (value)
 {
    this.ready = $CombineDelegates(this.ready, value);
};
shetab.SEEngine.prototype.remove_ready = function (value)
 {
    this.ready = $RemoveDelegate(this.ready, value);
};
shetab.SEEngine.prototype.fireReadyEvent = function ()
 {
    if (this.ready !== null)
        this.ready();
};
shetab.SEEngine.prototype.add_propertyChanged = function (value)
 {
    this.propertyChanged = $CombineDelegates(this.propertyChanged, value);
};
shetab.SEEngine.prototype.remove_propertyChanged = function (value)
 {
    this.propertyChanged = $RemoveDelegate(this.propertyChanged, value);
};
shetab.SEEngine.get_current = function ()
 {
    return shetab.SEEngine._current;
};
shetab.SEEngine.set_current = function (value)
 {
    shetab.SEEngine._current = value;
};
Object.defineProperty(shetab.SEEngine, "current", {get: shetab.SEEngine.get_current, set: shetab.SEEngine.set_current, enumerable: true});
shetab.SEEngine.prototype.get_config = function ()
 {
    return this._config;
};
shetab.SEEngine.prototype.set_config = function (value)
 {
    this._config = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "config", {get: shetab.SEEngine.prototype.get_config, set: shetab.SEEngine.prototype.set_config, enumerable: true});
shetab.SEEngine.prototype.get_engineModuleInstance = function ()
 {
    return this.moduleManager.getModuleInstanceById("1");
};
Object.defineProperty(shetab.SEEngine.prototype, "engineModuleInstance", {get: shetab.SEEngine.prototype.get_engineModuleInstance, enumerable: true});
shetab.SEEngine.prototype.get_navigationPaneLock = function ()
 {
    return this._navigationPaneLock;
};
shetab.SEEngine.prototype.set_navigationPaneLock = function (value)
 {
    this._navigationPaneLock = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "navigationPaneLock", {get: shetab.SEEngine.prototype.get_navigationPaneLock, set: shetab.SEEngine.prototype.set_navigationPaneLock, enumerable: true});
shetab.SEEngine.prototype.get_fullView = function ()
 {
    return this._fullView;
};
shetab.SEEngine.prototype.set_fullView = function (value)
 {
    this._fullView = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "fullView", {get: shetab.SEEngine.prototype.get_fullView, set: shetab.SEEngine.prototype.set_fullView, enumerable: true});
shetab.SEEngine.prototype.get_project = function ()
 {

    return this._project;
};
shetab.SEEngine.prototype.set_project = function (value)
 {
    this._project = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "project", {get: shetab.SEEngine.prototype.get_project, set: shetab.SEEngine.prototype.set_project, enumerable: true});
shetab.SEEngine.prototype.localizeText$$String = function (text)
 {
    return this.localizeText$$String$$SEResourceManager$$Object(text, null , null);
};
shetab.SEEngine.prototype.localizeText$$String$$SEResourceManager = function (text, localResourceManager)
 {
    return this.localizeText$$String$$SEResourceManager$$Object(text, localResourceManager, null);
};
shetab.SEEngine.prototype.localizeText$$String$$SEResourceManager$$Object = function (text, localResourceManager, localProperties)
 {
    if (text === null)
        return null;
    var start = 0;
    while (true)
    {
        start = text.indexOf("@(", start);
        if (start === -1)
            break;
        var end = text.indexOf(")", start);
        if (end === -1)
            break;
        var orgPhrase = text.substring(start, end + 1);
        var phrase = orgPhrase.substring(2, orgPhrase.length - 1);
        var colonIndex = phrase.indexOf(":");
        var module = null;
        if (colonIndex !== -1)
        {
            module = shetab.common.StringHelper.trim(phrase.substring(0, colonIndex)).toLowerCase();
            phrase = phrase.substring(colonIndex + 1);
        }
        var commaIndex = phrase.indexOf(",");
        var resourceFile = null;
        if (commaIndex !== -1)
        {
            resourceFile = shetab.common.StringHelper.trim(phrase.substring(0, commaIndex));
            phrase = phrase.substring(commaIndex + 1);
        }
        var resourceKey = shetab.common.StringHelper.trim(phrase);
        var value = null;
        if (resourceFile === "properties")
        {
            value = localProperties !== null && (module === null || module === shetab.SEGlobal.moduleName_local) ? shetab.common.Utility.checkUndefined(localProperties[resourceKey], null) : null;
            if (value === null && this.canGetCoreProperty(resourceKey))
                value = this.getCoreProperty(resourceKey);
        }
        else
        {
            if (localResourceManager !== null && (module === null || module === shetab.SEGlobal.moduleName_local))
                value = localResourceManager.getString$$String$$String$$String((module !== null ? module : shetab.SEGlobal.moduleName_local), (resourceFile !== null ? resourceFile : "General"), resourceKey);
            if (value === null)
                value = this.resourceManager.getString$$String$$String$$String((module !== null ? module : shetab.SEGlobal.moduleName_reader), (resourceFile !== null ? resourceFile : "General"), resourceKey);
        }
        if (value !== null)
            text = text.replace(orgPhrase, value);
        else
            start = end;
    }
    return text;
};
shetab.SEEngine.prototype.get_searchQuery = function ()
 {
    return this._searchQuery === null || this._searchQuery === "" ? this.localizeText$$String("reader:commands,SearchQuery") : this._searchQuery;
};
shetab.SEEngine.prototype.set_searchQuery = function (value)
 {
    this._searchQuery = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "searchQuery", {get: shetab.SEEngine.prototype.get_searchQuery, set: shetab.SEEngine.prototype.set_searchQuery, enumerable: true});
shetab.SEEngine.prototype.get_isSearchEnabled = function ()
 {
    return this.get_project() !== null;
};
Object.defineProperty(shetab.SEEngine.prototype, "isSearchEnabled", {get: shetab.SEEngine.prototype.get_isSearchEnabled, enumerable: true});
shetab.SEEngine.prototype.updateProperty$1$$T$$T$$Object = function (value, newValue, propertyName)
 {
    this.updateProperty$1$$T$$T$$Array(value, newValue,  [propertyName]);
};
shetab.SEEngine.prototype.updateProperty$1$$T$$T$$Array = function (value, newValue, properties)
 {
    if (value.Value === newValue)
        return;
    value.Value = newValue;
    this.firePropertyChanged$$Array(properties);
};
shetab.SEEngine.prototype.firePropertyChanged$$Object = function (propertyName)
 {
    this.firePropertyChanged$$Array( [propertyName]);
};
shetab.SEEngine.prototype.firePropertyChanged$$Array = function (properties)
 {
    if (properties === null)
        properties =  [null];
    for (var $i22 = 0, $l22 = properties.length, propertyName = properties[$i22]; $i22 < $l22; $i22++, propertyName = properties[$i22])
    {
        if (this._changedProperties.indexOf(propertyName) !== -1)
            return;
        this._changedProperties.push(propertyName);
    }
    if (this._firePropertyTimerId !== 0)
        clearTimeout(this._firePropertyTimerId);
    this._firePropertyTimerId = setTimeout($CreateDelegate(this, this.firePropertyChangedImpl), 200);
};
shetab.SEEngine.prototype.firePropertyChangedImpl = function ()
 {
    var properties = this._changedProperties;
    this._firePropertyTimerId = 0;
    this._changedProperties =  [];
    if (this.propertyChanged !== null)
        for (var i = 0; i < properties.length; i++)
            this.propertyChanged(properties[i]);
    var agentApi = new shetab.api.SEAgent();
    agentApi.firePropertiesChanged(properties);
    var isMediaPositionProp = properties.length === 1 && properties[0] === shetab.tokens.SEProperty.mediaPosition;
    if (!isMediaPositionProp)
        agentApi.fireUpdateUI();
};
shetab.SEEngine.prototype.firePropertyBagChanged = function (propertyBagItemProperty)
 {
    if (this._firePropertyBagTimerId !== 0)
        clearTimeout(this._firePropertyBagTimerId);
    if (!this._propertyBagChangeSet.hasOwnProperty(this._propertyBagChangeSetId.toString()))
        this._propertyBagChangeSet[this._propertyBagChangeSetId.toString()] =  [];
    var changeSet = this._propertyBagChangeSet[this._propertyBagChangeSetId.toString()];
    changeSet.push(propertyBagItemProperty);
    this._firePropertyBagTimerId = setTimeout($CreateDelegate(this, this.firePropertyBagChangedImpl), 200);
};
shetab.SEEngine.prototype.firePropertyBagChangedImpl = function ()
 {
    this._firePropertyTimerId = 0;
    var curChangeSetId = this._propertyBagChangeSetId.toString();
    var curChangeSet = this._propertyBagChangeSet[curChangeSetId];
    this._propertyBagChangeSetId = (++this._propertyBagChangeSetId) % 5;
    var changedEntites =  [];
    for (var $i23 = 0, $l23 = curChangeSet.length, propertyBagItemProperty = curChangeSet[$i23]; $i23 < $l23; $i23++, propertyBagItemProperty = curChangeSet[$i23])
    {
        if (changedEntites.indexOf(propertyBagItemProperty.moduleEntityId) === -1)
            changedEntites.push(propertyBagItemProperty.moduleEntityId);
    }
    var agentApi = new shetab.api.SEAgent();
    agentApi.firePropertyBagChanged(changedEntites, curChangeSetId);
};
shetab.SEEngine.prototype.getPropertyBagChangedSet = function (moduleEntityId, chagngeSetId)
 {
    var ret =  [];
    if (!this._propertyBagChangeSet.hasOwnProperty(chagngeSetId))
        return ret;
    var changeSet = this._propertyBagChangeSet[chagngeSetId];
    if (chagngeSetId === null)
        return changeSet;
    for (var $i24 = 0, $l24 = changeSet.length, item = changeSet[$i24]; $i24 < $l24; $i24++, item = changeSet[$i24])
    {
        if (item.moduleEntityId === moduleEntityId || moduleEntityId === null)
            ret.push(item);
    }
    return ret;
};
shetab.SEEngine.prototype.initialize = function ()
 {
    this.startupInfo.set_rootUrl(shetab.common.Uri.getQueryString(location.href, "rootUrl"));
    this.startupInfo.set_projectUrl(shetab.common.Uri.getQueryString(location.href, "projectUrl"));
    if (this.startupInfo.get_rootUrl() === null)

        this.startupInfo.set_rootUrl(shetab.common.Uri.getParent(shetab.common.Uri.getParent(shetab.common.Uri.getParent(location.href))) + "/");
};
shetab.SEEngine.prototype.getModuleById = function (moduleId)
 {
    return shetab.common.Utility.checkUndefined(this.get_modules()[moduleId.toLowerCase()], null);
};
shetab.SEEngine.prototype.onReady = function ()
 {
    this.update();
    for (var $i25 = 0, $t25 = this.get_startupModuleEntityUrls(), $l25 = $t25.length, url = $t25[$i25]; $i25 < $l25; $i25++, url = $t25[$i25])
        this.moduleManager.openDocument(url, 0, null , null , false);
    setInterval($CreateDelegate(this, this.updateInterval), 500);
};
shetab.SEEngine.prototype.updateInterval = function ()
 {
    this.updateUI();
};
shetab.SEEngine.prototype.updateUI = function ()
 {
    this.isLogEnabled = false;
    try
    {
        if (this.commandHandler.get_zoomCommandHandler() !== null)
        {
            try
            {
                (function ()
                {
                    this._oldCommandHandlerStates.zoom = {Value: this._oldCommandHandlerStates.zoom};
                    var $res = this.updateProperty$1$$T$$T$$Object(this._oldCommandHandlerStates.zoom, this.commandHandler.get_zoomCommandHandler().zoom, shetab.tokens.SEProperty.zoom);
                    this._oldCommandHandlerStates.zoom = this._oldCommandHandlerStates.zoom.Value;
                    return $res;
                }).call(this);
            }
            catch ($$e3)
            {
            }
            try
            {
                (function ()
                {
                    this._oldCommandHandlerStates.zoomMode = {Value: this._oldCommandHandlerStates.zoomMode};
                    var $res = this.updateProperty$1$$T$$T$$Object(this._oldCommandHandlerStates.zoomMode, this.commandHandler.get_zoomCommandHandler().zoomMode, shetab.tokens.SEProperty.zoomMode);
                    this._oldCommandHandlerStates.zoomMode = this._oldCommandHandlerStates.zoomMode.Value;
                    return $res;
                }).call(this);
            }
            catch ($$e4)
            {
            }
        }
        if (this.commandHandler.get_mediaCommandHandler() !== null)
        {
            try
            {
                (function ()
                {
                    this._oldCommandHandlerStates.mediaPosition = {Value: this._oldCommandHandlerStates.mediaPosition};
                    var $res = this.updateProperty$1$$T$$T$$Object(this._oldCommandHandlerStates.mediaPosition, this.commandHandler.get_mediaCommandHandler().mediaPosition, shetab.tokens.SEProperty.mediaPosition);
                    this._oldCommandHandlerStates.mediaPosition = this._oldCommandHandlerStates.mediaPosition.Value;
                    return $res;
                }).call(this);
            }
            catch ($$e5)
            {
            }
            try
            {
                (function ()
                {
                    this._oldCommandHandlerStates.mediaState = {Value: this._oldCommandHandlerStates.mediaState};
                    var $res = this.updateProperty$1$$T$$T$$Object(this._oldCommandHandlerStates.mediaState, this.commandHandler.get_mediaCommandHandler().mediaState, shetab.tokens.SEProperty.mediaState);
                    this._oldCommandHandlerStates.mediaState = this._oldCommandHandlerStates.mediaState.Value;
                    return $res;
                }).call(this);
            }
            catch ($$e6)
            {
            }
            try
            {
                (function ()
                {
                    this._oldCommandHandlerStates.mediaLength = {Value: this._oldCommandHandlerStates.mediaLength};
                    var $res = this.updateProperty$1$$T$$T$$Object(this._oldCommandHandlerStates.mediaLength, this.commandHandler.get_mediaCommandHandler().mediaLength, shetab.tokens.SEProperty.mediaLength);
                    this._oldCommandHandlerStates.mediaLength = this._oldCommandHandlerStates.mediaLength.Value;
                    return $res;
                }).call(this);
            }
            catch ($$e7)
            {
            }
        }
    }
    finally
    {
        this.isLogEnabled = true;
    }
};
shetab.SEEngine.prototype.get_zoomMode = function ()
 {
    if (this.commandHandler.get_zoomCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    return this.commandHandler.get_zoomCommandHandler().zoomMode;
};
shetab.SEEngine.prototype.set_zoomMode = function (value)
 {
    if (this.commandHandler.get_zoomCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    if (this.commandHandler.get_zoomCommandHandler().canSetZoomMode(value))
        this.commandHandler.get_zoomCommandHandler().zoomMode = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "zoomMode", {get: shetab.SEEngine.prototype.get_zoomMode, set: shetab.SEEngine.prototype.set_zoomMode, enumerable: true});
shetab.SEEngine.prototype.get_zoom = function ()
 {
    if (this.commandHandler.get_zoomCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    return this.commandHandler.get_zoomCommandHandler().zoom;
};
shetab.SEEngine.prototype.set_zoom = function (value)
 {
    if (this.commandHandler.get_zoomCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    this.commandHandler.get_zoomCommandHandler().zoom = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "zoom", {get: shetab.SEEngine.prototype.get_zoom, set: shetab.SEEngine.prototype.set_zoom, enumerable: true});
shetab.SEEngine.prototype.get_mediaState = function ()
 {
    if (this.commandHandler.get_mediaCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    return this.commandHandler.get_mediaCommandHandler().mediaState;
};
shetab.SEEngine.prototype.set_mediaState = function (value)
 {
    if (this.commandHandler.get_mediaCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    if (this.commandHandler.get_mediaCommandHandler().canSetMediaState(value))
        this.commandHandler.get_mediaCommandHandler().mediaState = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "mediaState", {get: shetab.SEEngine.prototype.get_mediaState, set: shetab.SEEngine.prototype.set_mediaState, enumerable: true});
shetab.SEEngine.prototype.get_mediaPosition = function ()
 {
    if (this.commandHandler.get_mediaCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    return this.commandHandler.get_mediaCommandHandler().mediaPosition;
};
shetab.SEEngine.prototype.set_mediaPosition = function (value)
 {
    if (this.commandHandler.get_mediaCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    this.commandHandler.get_mediaCommandHandler().mediaPosition = value;
};
Object.defineProperty(shetab.SEEngine.prototype, "mediaPosition", {get: shetab.SEEngine.prototype.get_mediaPosition, set: shetab.SEEngine.prototype.set_mediaPosition, enumerable: true});
shetab.SEEngine.prototype.get_mediaLength = function ()
 {
    if (this.commandHandler.get_mediaCommandHandler() === null)
        throw $CreateException(new shetab.common.error.NotAvailableError(), new Error());
    return this.commandHandler.get_mediaCommandHandler().mediaLength;
};
Object.defineProperty(shetab.SEEngine.prototype, "mediaLength", {get: shetab.SEEngine.prototype.get_mediaLength, enumerable: true});

shetab.SEEngine.prototype.canExecuteCommand = function (commandName)
 {
    var commandUI = new shetab.SECommandUI(commandName, false);
    this.commandHandler.processCommandUI(commandUI);
    return commandUI.get_isEnabled();
};
shetab.SEEngine.prototype.executeCommand = function (commandName)
 {
    var commandUI = new shetab.SECommandUI(commandName, true);
    this.commandHandler.processCommandUI(commandUI);
};
shetab.SEEngine.prototype.log$$String$$SEMessage = function (category, message)
 {
    if (this.get_options() === null || !this.get_options().get_isDiagnosticsInfoEnabled() || !this.isLogEnabled)
        return;
    for (var paramName in message.parameters)
    {
        var paramObj = message.parameters[paramName];
        var paramValue = message.getParam(paramName);
        if ((paramObj.valueByteArray !== null && paramObj.valueByteArray.length > 500) || (paramValue !== null && paramValue.length > 500))
        {
            message.setParam(paramName, "...");
            this.log$$String$$String(category, message.toXml());
            message.parameters[paramName] = paramObj;
            return;
        }
    }
    this.log$$String$$String(category, message.toXml());
};
shetab.SEEngine.prototype.log$$String$$String = function (category, text)
 {
    if (this.get_options() === null || !this.get_options().get_isDiagnosticsInfoEnabled() || !this.isLogEnabled)
        return;
    if (text.indexOf(shetab.tokens.SEMethod.canExecuteCommand) !== -1)
        return;
    if (this.get_options() === null || !this.get_options().get_isDiagnosticsInfoEnabled() || text === shetab.SEMessage.c_undefined)
        return;
    if (text.length > 500)
        text = text.substr(0, 500) + "...";
    console.log(category + ": ", text);
};
shetab.SEEngine.prototype.processOutgoingMessage = function (message)
 {
    this.log$$String$$SEMessage("out", message);
    var ret =  shetabEbookSendMessageToAgent(message);;
    this.log$$String$$String("result", ret);
    return ret;
};
shetab.SEEngine.prototype.processIncomingMessage$$SEMessage = function (message)
 {
    try
    {
        this.log$$String$$String("in", message.toXml());
        var ret = this.get_messageParser().processMessage$$SEMessage(message);
        return ret;
    }
    catch (e)
    {
        if (e.name !== shetab.common.error.NotAvailableError.errorName && e.name !== shetab.common.error.DoDefaultError.errorName)
            console.error(e.stack);
        return "$$error:" + e.toString();
    }
};
shetab.SEEngine.prototype.processIncomingMessage$$String = function (message)
 {
    try
    {
        this.log$$String$$String("in", message);
        var ret = this.get_messageParser().processMessage$$String(message);
        return ret;
    }
    catch (e)
    {
        if (e.name !== shetab.common.error.NotAvailableError.errorName && e.name !== shetab.common.error.DoDefaultError.errorName)
            console.error(e.stack);
        return "$$error:" + e.toString();
    }
};
shetab.SEEngine.prototype.getCoreProperty = function (propertyName)
 {
    var message = (function ()
    {
        var $v51 = new shetab.SEMessage();
        $v51.typeName = "Core";
        $v51.methodName = "getProperty";
        return $v51;
    }).call(this);
    message.setParam("propertyName", propertyName);
    return this.get_messageParser().processMessage$$SEMessage(message);
};
shetab.SEEngine.prototype.canGetCoreProperty = function (propertyName)
 {
    try
    {
        this.getCoreProperty(propertyName);
        return true;
    }
    catch ($$e8)
    {
        return false;
    }
};
shetab.SEEngine.prototype.canSetCoreProperty = function (propertyName, value)
 {
    switch (propertyName)
    {
        case shetab.tokens.SEProperty.zoomMode:
            return this.commandHandler.get_zoomCommandHandler() !== null && this.commandHandler.get_zoomCommandHandler().canSetZoomMode(value);
        case shetab.tokens.SEProperty.mediaState:
            return this.commandHandler.get_mediaCommandHandler() !== null && this.commandHandler.get_mediaCommandHandler().canSetMediaState(value);
        default :
            return this.canGetCoreProperty(propertyName);
    }
};
shetab.SEEngine.prototype.update = function ()
 {
    this.set_modules(new Object());
    for (var $i26 = 0, $t26 = this.get_config().modules, $l26 = $t26.length, item = $t26[$i26]; $i26 < $l26; $i26++, item = $t26[$i26])
        this.get_modules()[item.get_id().toLowerCase()] = item;
};
shetab.SEEngine.prototype.getStorage$$String$$SEModuleInstance = function (storageType, moduleInstance)
 {
    return this.getStorage$$String$$SEModuleInstance$$String(storageType, moduleInstance, null);
};
shetab.SEEngine.prototype.getStorage$$String$$SEModuleInstance$$String = function (storageType, moduleInstance, sessionName)
 {
    if (sessionName === null || sessionName === "")
        sessionName = moduleInstance.sessionName;
    var isolatedUrl = "shetab.ebook.storage/";
    if (this.get_isDesignMode() && this.get_project() !== null && sessionName.indexOf("shetab.creator") === -1)
        isolatedUrl = "storage/" + this.get_project().get_data().get_mediaId() + "/";
    isolatedUrl += shetab.common.Utility.replaceInvalidFileNameChars(sessionName) + "/";
    switch (storageType)
    {
        case "session":
            return this.get_isDesignMode() ? new shetab.storages.SEFileSystemStorage(shetab.common.Uri.combine(shetab.SESystem.get_current().get_tempFolderUrl(), isolatedUrl), true) : new shetab.storages.SEWebStorage(sessionStorage, isolatedUrl);
        case "local":
            return this.get_isDesignMode() ? new shetab.storages.SEFileSystemStorage(shetab.common.Uri.combine(shetab.SESystem.get_current().get_userProfileFolderUrl(), isolatedUrl), true) : new shetab.storages.SEWebStorage(localStorage, isolatedUrl);
        case "module":
            return moduleInstance.moduleEntity === null ? new shetab.storages.SEFileSystemStorage(shetab.common.Uri.combine(moduleInstance.url, "Storage/"), false) : moduleInstance.moduleEntity.get_module().get_storage();
        case "moduleEntity":
            if (moduleInstance.moduleEntity === null)
                throw new Error("Module did not open as Module Entity!");
            return moduleInstance.moduleEntity.get_storage();
        case "project":
            if (this.get_project() === null)
                throw new Error("Could not find any project!");
            return new shetab.storages.SEFileSystemStorage(shetab.common.Uri.combine(this.get_project().get_storageFolderUrl(), shetab.common.Utility.replaceInvalidFileNameChars(sessionName) + "/"), this.get_isDesignMode());
        default :
            throw $CreateException(new shetab.common.error.ArgumentOutOfRangeError(), new Error());
    }
};
shetab.SEReaderEngine = function ()
 {
    shetab.SEEngine.call(this);
    this.set_messageParser(new shetab.api.SEMessageParser());
    this.set_isDesignMode(false);
};
shetab.SEReaderEngine.prototype.initialize = function ()
 {
    shetab.SEEngine.prototype.initialize.call(this);
    var initializer = new shetab.SEReaderInitializer();
};
$Inherit(shetab.SEReaderEngine, shetab.SEEngine);
shetab.SEOptions = function ()
 {
    this._isDiagnosticsInfoEnabled = true;
    this._navigationPanelVisible = true;
    this._navigationPanelLock = false;
    this._navigationPanelAutoHide = false;
    this._navigationPanelWidth = 300;
    this._soundVolume = 70;
    this._mute = false;
};
shetab.SEOptions.prototype.get_engine = function ()
 {
    return shetab.SEEngine.get_current();
};
Object.defineProperty(shetab.SEOptions.prototype, "engine", {get: shetab.SEOptions.prototype.get_engine, enumerable: true});
shetab.SEOptions.prototype.get_isDiagnosticsInfoEnabled = function ()
 {
    return this._isDiagnosticsInfoEnabled;
};

shetab.SEOptions.prototype.set_isDiagnosticsInfoEnabled = function (value)
 {
    (function ()
    {
        this._isDiagnosticsInfoEnabled = {Value: this._isDiagnosticsInfoEnabled};
        var $res = this.get_engine().updateProperty$1$$T$$T$$Object(this._isDiagnosticsInfoEnabled, value, shetab.tokens.SEProperty.isDiagnosticsInfoEnabled);
        this._isDiagnosticsInfoEnabled = this._isDiagnosticsInfoEnabled.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SEOptions.prototype, "isDiagnosticsInfoEnabled", {get: shetab.SEOptions.prototype.get_isDiagnosticsInfoEnabled, set: shetab.SEOptions.prototype.set_isDiagnosticsInfoEnabled, enumerable: true});
shetab.SEOptions.prototype.get_navigationPanelVisible = function ()
 {
    return this._navigationPanelVisible;
};
shetab.SEOptions.prototype.set_navigationPanelVisible = function (value)
 {
    (function ()
    {
        this._navigationPanelVisible = {Value: this._navigationPanelVisible};
        var $res = this.get_engine().updateProperty$1$$T$$T$$Object(this._navigationPanelVisible, value, shetab.tokens.SEProperty.navigationPanelVisible);
        this._navigationPanelVisible = this._navigationPanelVisible.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SEOptions.prototype, "navigationPanelVisible", {get: shetab.SEOptions.prototype.get_navigationPanelVisible, set: shetab.SEOptions.prototype.set_navigationPanelVisible, enumerable: true});
shetab.SEOptions.prototype.get_navigationPanelLock = function ()
 {
    return this._navigationPanelLock;
};
shetab.SEOptions.prototype.set_navigationPanelLock = function (value)
 {
    (function ()
    {
        this._navigationPanelLock = {Value: this._navigationPanelLock};
        var $res = this.get_engine().updateProperty$1$$T$$T$$Object(this._navigationPanelLock, value, shetab.tokens.SEProperty.navigationPanelLock);
        this._navigationPanelLock = this._navigationPanelLock.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SEOptions.prototype, "navigationPanelLock", {get: shetab.SEOptions.prototype.get_navigationPanelLock, set: shetab.SEOptions.prototype.set_navigationPanelLock, enumerable: true});
shetab.SEOptions.prototype.get_navigationPanelAutoHide = function ()
 {
    return this._navigationPanelAutoHide;
};
shetab.SEOptions.prototype.set_navigationPanelAutoHide = function (value)
 {
    (function ()
    {
        this._navigationPanelAutoHide = {Value: this._navigationPanelAutoHide};
        var $res = this.get_engine().updateProperty$1$$T$$T$$Object(this._navigationPanelAutoHide, value, shetab.tokens.SEProperty.navigationPanelAutoHide);
        this._navigationPanelAutoHide = this._navigationPanelAutoHide.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SEOptions.prototype, "navigationPanelAutoHide", {get: shetab.SEOptions.prototype.get_navigationPanelAutoHide, set: shetab.SEOptions.prototype.set_navigationPanelAutoHide, enumerable: true});
shetab.SEOptions.prototype.get_navigationPanelWidth = function ()
 {
    return this._navigationPanelWidth;
};
shetab.SEOptions.prototype.set_navigationPanelWidth = function (value)
 {
    (function ()
    {
        this._navigationPanelWidth = {Value: this._navigationPanelWidth};
        var $res = this.get_engine().updateProperty$1$$T$$T$$Object(this._navigationPanelWidth, value, shetab.tokens.SEProperty.navigationPanelWidth);
        this._navigationPanelWidth = this._navigationPanelWidth.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SEOptions.prototype, "navigationPanelWidth", {get: shetab.SEOptions.prototype.get_navigationPanelWidth, set: shetab.SEOptions.prototype.set_navigationPanelWidth, enumerable: true});
shetab.SEOptions.prototype.get_soundVolume = function ()
 {
    return this._soundVolume;
};
shetab.SEOptions.prototype.set_soundVolume = function (value)
 {
    (function ()
    {
        this._soundVolume = {Value: this._soundVolume};
        var $res = this.get_engine().updateProperty$1$$T$$T$$Object(this._soundVolume, value, shetab.tokens.SEProperty.soundVolume);
        this._soundVolume = this._soundVolume.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SEOptions.prototype, "soundVolume", {get: shetab.SEOptions.prototype.get_soundVolume, set: shetab.SEOptions.prototype.set_soundVolume, enumerable: true});
shetab.SEOptions.prototype.get_mute = function ()
 {
    return this._mute;
};
shetab.SEOptions.prototype.set_mute = function (value)
 {
    (function ()
    {
        this._mute = {Value: this._mute};
        var $res = this.get_engine().updateProperty$1$$T$$T$$Object(this._mute, value, shetab.tokens.SEProperty.mute);
        this._mute = this._mute.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SEOptions.prototype, "mute", {get: shetab.SEOptions.prototype.get_mute, set: shetab.SEOptions.prototype.set_mute, enumerable: true});
shetab.SEOptions.prototype.serialize = function (documentElement, save)
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
if (typeof(shetab.storages) == "undefined")
    shetab.storages = {};
shetab.storages.SEFileSystemStorage = function (baseUrl, writable)
 {
    this._baseUrl = null;
    this._writable = null;
    this._baseUrl = baseUrl;
    this._writable = writable;
};
shetab.storages.SEFileSystemStorage.prototype.getAbsoluteUrl = function (fileName)
 {
    return shetab.common.Uri.combine(this._baseUrl, fileName);
};
shetab.storages.SEFileSystemStorage.prototype.get_canWrite = function ()
 {
    return this._writable;
};
Object.defineProperty(shetab.storages.SEFileSystemStorage.prototype, "canWrite", {get: shetab.storages.SEFileSystemStorage.prototype.get_canWrite, enumerable: true});
shetab.storages.SEFileSystemStorage.prototype.deleteFile = function (fileName, doneCallback)
 {
    try
    {
        if (!this.get_canWrite())
            throw $CreateException(new shetab.common.error.FileAccessError(this.getAbsoluteUrl(fileName)), new Error());
        var res = shetab.SESystem.get_current().deleteFile(this.getAbsoluteUrl(fileName));
        if (res !== "" && res !== null)
            throw new Error(res);
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK"));
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEFileSystemStorage.prototype.writeBinaryFile = function (fileName, data, doneCallback)
 {
    try
    {
        if (!this.get_canWrite())
            throw $CreateException(new shetab.common.error.FileAccessError(this.getAbsoluteUrl(fileName)), new Error());
        var res = shetab.SESystem.get_current().writeBinaryFile(this.getAbsoluteUrl(fileName), data);
        if (res !== "" && res !== null)
            throw new Error(res);
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK"));
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEFileSystemStorage.prototype.writeTextFile = function (fileName, text, doneCallback)
 {
    try
    {
        if (!this.get_canWrite())
            throw $CreateException(new shetab.common.error.FileAccessError(this.getAbsoluteUrl(fileName)), new Error());
        var res = shetab.SESystem.get_current().writeTextFile(this.getAbsoluteUrl(fileName), text);
        if (res !== "" && res !== null)
            throw new Error(res);
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK"));
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEFileSystemStorage.prototype.getFileUrl = function (fileName, doneCallback)
 {

    doneCallback(new shetab.api.StorageCallbackParam(true, "OK", this.getAbsoluteUrl(fileName), "text"));
};
shetab.storages.SEFileSystemStorage.prototype.readBinaryFile = function (fileName, doneCallback)
 {
    try
    {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", this.getAbsoluteUrl(fileName));
         httpRequest.responseType = 'arraybuffer';
        httpRequest.onreadystatechange = $CreateAnonymousDelegate(this, function ()
        {
            if (httpRequest.readyState !== 4)
                return;
            if (shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status))
            {
                var u8 =  new Uint8Array(httpRequest.response);;
                var buffer = new Array(u8.length);
                for (var i = 0; i < u8.length; i++)
                    buffer[i] = u8[i];
                doneCallback(new shetab.api.StorageCallbackParam(true, httpRequest.statusText, buffer, "byteArray"));
            }
            else
            {
                doneCallback(new shetab.api.StorageCallbackParam(false, httpRequest.statusText));
            }
        });
        httpRequest.send();
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEFileSystemStorage.prototype.readTextFile = function (fileName, doneCallback)
 {
    try
    {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", this.getAbsoluteUrl(fileName));
        httpRequest.onreadystatechange = $CreateAnonymousDelegate(this, function ()
        {
            if (httpRequest.readyState !== 4)
                return;
            doneCallback(shetab.common.Utility.checkHttpRequestSuccess(httpRequest.status) ? new shetab.api.StorageCallbackParam(true, httpRequest.statusText, httpRequest.responseText, "text") : new shetab.api.StorageCallbackParam(false, httpRequest.statusText));
        });
        httpRequest.send();
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEWebStorage = function (storage, baseKey)
 {
    this._baseKey = null;
    this._storage = null;
    this._baseKey = baseKey;
    this._storage = storage;
};
shetab.storages.SEWebStorage.prototype.getAbsoluteKey = function (fileName)
 {
    return shetab.common.Uri.combine(this._baseKey, fileName);
};
shetab.storages.SEWebStorage.prototype.get_canWrite = function ()
 {
    return true;
};
Object.defineProperty(shetab.storages.SEWebStorage.prototype, "canWrite", {get: shetab.storages.SEWebStorage.prototype.get_canWrite, enumerable: true});
shetab.storages.SEWebStorage.prototype.deleteFile = function (fileName, doneCallback)
 {
    try
    {
        if (!this.get_canWrite())
            throw $CreateException(new shetab.common.error.FileAccessError(this.getAbsoluteKey(fileName)), new Error());
        this._storage.removeItem(this.getAbsoluteKey(fileName));
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK"));
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEWebStorage.prototype.writeBinaryFile = function (fileName, data, doneCallback)
 {
    try
    {
        if (!this.get_canWrite())
            throw $CreateException(new shetab.common.error.FileAccessError(this.getAbsoluteKey(fileName)), new Error());
        this._storage.setItem(this.getAbsoluteKey(fileName), data);
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK"));
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEWebStorage.prototype.writeTextFile = function (fileName, text, doneCallback)
 {
    try
    {
        if (!this.get_canWrite())
            throw $CreateException(new shetab.common.error.FileAccessError(this.getAbsoluteKey(fileName)), new Error());
        this._storage.setItem(this.getAbsoluteKey(fileName), text);
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK"));
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEWebStorage.prototype.getFileUrl = function (fileName, doneCallback)
 {
    try
    {
        throw new Error("This storage does not support URL!");
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEWebStorage.prototype.readBinaryFile = function (fileName, doneCallback)
 {
    try
    {
        var data = this._storage.getItem(this.getAbsoluteKey(fileName));
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK", data, "byteArray"));
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
shetab.storages.SEWebStorage.prototype.readTextFile = function (fileName, doneCallback)
 {
    try
    {
        var data = this._storage.getItem(this.getAbsoluteKey(fileName));
        doneCallback(new shetab.api.StorageCallbackParam(true, "OK", data, "text"));
    }
    catch (e)
    {
        doneCallback(new shetab.api.StorageCallbackParam(false, e.toString()));
    }
};
if (typeof(shetab.tokens) == "undefined")
    shetab.tokens = {};
shetab.tokens.SECommand = function ()
 {
};
shetab.tokens.SECommand.openShetabWebsite = "openShetabWebsite";
shetab.tokens.SECommand.exit = "exit";
shetab.tokens.SECommand.unregisterSoftLock = "unregisterSoftLock";
shetab.tokens.SECommand.showDocumentInfo = "showDocumentInfo";
shetab.tokens.SECommand.focusToCommentText = "focusToCommentText";
shetab.tokens.SECommand.hideCommentWindow = "hideCommentWindow";
shetab.tokens.SECommand.showCommentListWindow = "showCommentListWindow";
shetab.tokens.SECommand.showContentsWindow = "showContentsWindow";
shetab.tokens.SECommand.showIndexWindow = "showIndexWindow";
shetab.tokens.SECommand.showFavoritesWindow = "showFavoritesWindow";
shetab.tokens.SECommand.showSearchWindow = "showSearchWindow";
shetab.tokens.SECommand.showHelpWindow = "showHelpWindow";
shetab.tokens.SECommand.showPageSetupWindow = "showPageSetupWindow";
shetab.tokens.SECommand.showFindWindow = "showFindWindow";
shetab.tokens.SECommand.showPrintPreview = "showPrintPreview";
shetab.tokens.SECommand.showAboutWindow = "showAboutWindow";
shetab.tokens.SECommand.showAboutEngineWindow = "showAboutEngineWindow";
shetab.tokens.SECommand.showPrintWindow = "showPrintWindow";
shetab.tokens.SECommand.toggleCommentWindowVisible = "toggleCommentWindowVisible";
shetab.tokens.SECommand.toggleMarkupWindowVisible = "toggleMarkupWindowVisible";
shetab.tokens.SECommand.toggleFullScreen = "toggleFullScreen";
shetab.tokens.SECommand.toggleFullView = "toggleFullView";
shetab.tokens.SECommand.toggleNavigationPanelVisible = "toggleNavigationPanelVisible";
shetab.tokens.SECommand.toggleNavigationPanelAutoHide = "toggleNavigationPanelAutoHide";
shetab.tokens.SECommand.showPropertiesWindow = "showPropertiesWindow";
shetab.tokens.SECommand.showOptionsWindow = "showOptionsWindow";
shetab.tokens.SECommand.zoomIn = "zoomIn";
shetab.tokens.SECommand.zoomOut = "zoomOut";
shetab.tokens.SECommand.zoomActualSize = "zoomActualSize";
shetab.tokens.SECommand.zoomFitPage = "zoomFitPage";
shetab.tokens.SECommand.zoomFitWidth = "zoomFitWidth";
shetab.tokens.SECommand.zoom200 = "zoom200";
shetab.tokens.SECommand.zoom50 = "zoom50";
shetab.tokens.SECommand.addToFavorites = "addToFavorites";
shetab.tokens.SECommand.copyAddress = "copyAddress";
shetab.tokens.SECommand.displayOnePage = "displayOnePage";
shetab.tokens.SECommand.displayTwoPage = "displayTwoPage";
shetab.tokens.SECommand.exportFile = "exportFile";
shetab.tokens.SECommand.refresh = "refresh";

shetab.tokens.SECommand.selectArrowTool = "selectArrowTool";
shetab.tokens.SECommand.selectHandTool = "selectHandTool";
shetab.tokens.SECommand.selectRectangleTool = "selectRectangleTool";
shetab.tokens.SECommand.selectTextBoxTool = "selectTextBoxTool";
shetab.tokens.SECommand.selectPencilTool = "selectPencilTool";
shetab.tokens.SECommand.selectStickyNoteTool = "selectStickyNoteTool";
shetab.tokens.SECommand.selectCrossOutTextTool = "selectCrossOutTextTool";
shetab.tokens.SECommand.selectUnderlineTextTool = "selectUnderlineTextTool";
shetab.tokens.SECommand.selectHighlightTextTool = "selectHighlightTextTool";
shetab.tokens.SECommand.selectHighlightTextRedTool = "selectHighlightTextRedTool";
shetab.tokens.SECommand.selectHighlightTextGreenTool = "selectHighlightTextGreenTool";
shetab.tokens.SECommand.selectTextTipTool = "selectTextTipTool";
shetab.tokens.SECommand.sendSelectionToBack = "sendSelectionToBack";
shetab.tokens.SECommand.bringSelectionToFront = "bringSelectionToFront";
shetab.tokens.SECommand.minimize = "minimize";
shetab.tokens.SECommand.maximize = "maximize";
shetab.tokens.SECommand.navigatePreviousPage = "navigatePreviousPage";
shetab.tokens.SECommand.navigateNextPage = "navigateNextPage";
shetab.tokens.SECommand.navigatePreviousTopic = "navigatePreviousTopic";
shetab.tokens.SECommand.navigateNextTopic = "navigateNextTopic";
shetab.tokens.SECommand.navigateBack = "navigateBack";
shetab.tokens.SECommand.navigateForward = "navigateForward";
shetab.tokens.SECommand.navigateHome = "navigateHome";
shetab.tokens.SECommand.navigateBlank = "navigateBlank";
shetab.tokens.SECommand.selectAll = "selectAll";
shetab.tokens.SECommand.moveSelection = "moveSelection";
shetab.tokens.SECommand.copySelection = "copySelection";
shetab.tokens.SECommand.cutSelection = "cutSelection";
shetab.tokens.SECommand.deleteSelection = "deleteSelection";
shetab.tokens.SECommand.renameSelection = "renameSelection";
shetab.tokens.SECommand.paste = "paste";
shetab.tokens.SECommand.openSelection = "openSelection";
shetab.tokens.SECommand.newFolder = "newFolder";
shetab.tokens.SECommand.moveToPreviousSibling = "moveToPreviousSibling";
shetab.tokens.SECommand.moveToNextSibling = "moveToNextSibling";
shetab.tokens.SECommand.stopMedia = "stopMedia";
shetab.tokens.SECommand.playMedia = "playMedia";
shetab.tokens.SECommand.pauseMedia = "pauseMedia";
shetab.tokens.SECommand.nextMedia = "nextMedia";
shetab.tokens.SECommand.previousMedia = "previousMedia";
shetab.tokens.SECommand.togglePlayMedia = "togglePlayMedia";
shetab.tokens.SECommand.toggleMute = "toggleMute";
shetab.tokens.SECommand.showDeveloperTools = "showDeveloperTools";
shetab.tokens.SECommand.commentSubjectBox = "commentSubjectBox";
shetab.tokens.SECommand.commentTextBox = "commentTextBox";
shetab.tokens.SECommand.commentTimeBox = "commentTimeBox";
shetab.tokens.SECommand.commentAuthorBox = "commentAuthorBox";
shetab.tokens.SECommand.mediaTimerBox = "mediaTimerBox";
shetab.tokens.SECommand.mediaSlider = "mediaSlider";
shetab.tokens.SECommand.volumeSlider = "volumeSlider";
shetab.tokens.SECommand.pageNumberBox = "pageNumberBox";
shetab.tokens.SECommand.pageCountBox = "pageCountBox";
shetab.tokens.SECommand.searchBox = "searchBox";
shetab.tokens.SECommand.restart = "restart";
shetab.tokens.SECommand.test1 = "test1";
shetab.tokens.SECommand.test2 = "test2";
shetab.tokens.SECommand.closePopupWindow = "closePopupWindow";
shetab.tokens.SEProperty = function ()
 {
};
shetab.tokens.SEProperty.isExternalPropertyBagNotificationEnabled = "isExternalPropertyBagNotificationEnabled";
shetab.tokens.SEProperty.moduleInstanceId = "moduleInstanceId";
shetab.tokens.SEProperty.moduleEntityId = "moduleEntityId";
shetab.tokens.SEProperty.canActive = "canActive";
shetab.tokens.SEProperty.isActiveModule = "isActiveModule";
shetab.tokens.SEProperty.isContainsActiveModule = "isContainsActiveModule";
shetab.tokens.SEProperty.propertyBag = "propertyBag";
shetab.tokens.SEProperty.selectedItem = "selectedItem";
shetab.tokens.SEProperty.selectedItems = "selectedItems";
shetab.tokens.SEProperty.sessionStorage = "sessionStorage";
shetab.tokens.SEProperty.localStorage = "localStorage";
shetab.tokens.SEProperty.moduleEntityStorage = "moduleEntityStorage";
shetab.tokens.SEProperty.moduleStorage = "moduleStorage";
shetab.tokens.SEProperty.projectStorage = "projectStorage";
shetab.tokens.SEProperty.projectBooksFolder = "projectBooksFolder";
shetab.tokens.SEProperty.projectUrl = "projectUrl";
shetab.tokens.SEProperty.productName = "productName";
shetab.tokens.SEProperty.productVersion = "productVersion";
shetab.tokens.SEProperty.productCompanyName = "productCompanyName";
shetab.tokens.SEProperty.productSupportEmail = "productSupportEmail";
shetab.tokens.SEProperty.productSupportUrl = "productSupportUrl";
shetab.tokens.SEProperty.productSupportPhone = "productSupportPhone";
shetab.tokens.SEProperty.productCopyright = "productCopyright";
shetab.tokens.SEProperty.productCulture = "productCulture";
shetab.tokens.SEProperty.shetabReaderVersion = "shetabReaderVersion";
shetab.tokens.SEProperty.windowState = "windowState";
shetab.tokens.SEProperty.visible = "visible";
shetab.tokens.SEProperty.position = "position";
shetab.tokens.SEProperty.size = "size";
shetab.tokens.SEProperty.viewSize = "viewSize";
shetab.tokens.SEProperty.maxSize = "maxSize";
shetab.tokens.SEProperty.isShortcutMenuEnabled = "isShortcutMenuEnabled";
shetab.tokens.SEProperty.minSize = "minSize";
shetab.tokens.SEProperty.fullScreen = "fullScreen";
shetab.tokens.SEProperty.fullView = "fullView";
shetab.tokens.SEProperty.skinVisible = "skinVisible";
shetab.tokens.SEProperty.readerSkins = "readerSkins";
shetab.tokens.SEProperty.skinId = "skinId";
shetab.tokens.SEProperty.navigationPanelVisible = "navigationPanelVisible";
shetab.tokens.SEProperty.navigationPanelLock = "navigationPanelLock";
shetab.tokens.SEProperty.navigationPanelWidth = "navigationPanelWidth";
shetab.tokens.SEProperty.navigationPanelAutoHide = "navigationPanelAutoHide";
shetab.tokens.SEProperty.markupWindowVisible = "markupWindowVisible";
shetab.tokens.SEProperty.commentWindowVisible = "commentWindowVisible";
shetab.tokens.SEProperty.isEffect3DEnabled = "isEffect3DEnabled";
shetab.tokens.SEProperty.isEffect3DAvailable = "isEffect3DAvailable";
shetab.tokens.SEProperty.pageDisplay = "pageDisplay";
shetab.tokens.SEProperty.highlightSearch = "highlightSearch";
shetab.tokens.SEProperty.skinClientLocation = "skinClientLocation";
shetab.tokens.SEProperty.skinClientSize = "skinClientSize";
shetab.tokens.SEProperty.skinClientVisible = "skinClientVisible";
shetab.tokens.SEProperty.skinDesignSize = "skinDesignSize";
shetab.tokens.SEProperty.skinAutoZoom = "skinAutoZoom";
shetab.tokens.SEProperty.skinFile = "skinFile";
shetab.tokens.SEProperty.contentsViewLink = "contentsViewLink";
shetab.tokens.SEProperty.defaultContentsViewLink = "defaultContentsViewLink";
shetab.tokens.SEProperty.isDiagnosticsInfoEnabled = "isDiagnosticsInfoEnabled";
shetab.tokens.SEProperty.soundVolume = "soundVolume";
shetab.tokens.SEProperty.mute = "mute";
shetab.tokens.SEProperty.commentSubject = "commentSubject";
shetab.tokens.SEProperty.commentAuthor = "commentAuthor";
shetab.tokens.SEProperty.commentText = "commentText";
shetab.tokens.SEProperty.commentTime = "commentTime";
shetab.tokens.SEProperty.pageLabel = "pageLabel";
shetab.tokens.SEProperty.pageCount = "pageCount";
shetab.tokens.SEProperty.searchQuery = "searchQuery";
shetab.tokens.SEProperty.zoom = "zoom";
shetab.tokens.SEProperty.zoomMode = "zoomMode";
shetab.tokens.SEProperty.uiCulture = "uiCulture";
shetab.tokens.SEProperty.isCommentSubjectEnabled = "isCommentSubjectEnabled";
shetab.tokens.SEProperty.isCommentAuthorEnabled = "isCommentAuthorEnabled";
shetab.tokens.SEProperty.isCommentTextEnabled = "isCommentTextEnabled";

shetab.tokens.SEProperty.isCommentTimeEnabled = "isCommentTimeEnabled";
shetab.tokens.SEProperty.isPageLabelEnabled = "isPageLabelEnabled";
shetab.tokens.SEProperty.isPageCountEnabled = "isPageCountEnabled";
shetab.tokens.SEProperty.isSearchQueryEnabled = "isSearchQueryEnabled";
shetab.tokens.SEProperty.topics = "topics";
shetab.tokens.SEProperty.currentTopicId = "currentTopicId";
shetab.tokens.SEProperty.selectedTopicId = "selectedTopicId";
shetab.tokens.SEProperty.currentRootTopicId = "currentRootTopicId";
shetab.tokens.SEProperty.documentUrl = "documentUrl";
shetab.tokens.SEProperty.documentLink = "documentLink";
shetab.tokens.SEProperty.mediaPosition = "mediaPosition";
shetab.tokens.SEProperty.mediaState = "mediaState";
shetab.tokens.SEProperty.mediaLength = "mediaLength";
shetab.tokens.SEProperty.isMediaOpen = "isMediaOpen";
shetab.tokens.SEProperty.isMediaPlaying = "isMediaPlaying";
shetab.tokens.SEProperty.isMediaPaused = "isMediaPaused";
shetab.tokens.SEProperty.isMediaStopped = "isMediaStopped";
shetab.tokens.SEProperty.showAboutEngineMenu = "showAboutEngineMenu";
shetab.tokens.SEProperty.flowDirection = "flowDirection";
shetab.tokens.SEProperty.uiFlowDirection = "uiFlowDirection";
shetab.tokens.SEProperty.isShetabEbookHost = "isShetabEbookHost";
shetab.tokens.SEProperty.isTestMode = "isTestMode";
shetab.tokens.SEProperty.moduleFile = "moduleFile";
shetab.tokens.SEProperty.moduleFolder = "moduleFolder";
shetab.tokens.SEProperty.enableUpdateView = "enableUpdateView";
shetab.tokens.SEProperty.enableFocus = "enableFocus";
shetab.tokens.SEProperty.isDesignMode = "isDesignMode";
shetab.tokens.SEProperty.plugins = "plugins";
shetab.tokens.SEProperty.selectedBookId = "selectedBookId";
shetab.tokens.SEProperty.rootBookId = "rootBookId";
shetab.tokens.SEProperty.books = "books";
shetab.tokens.SEProperty.shetabWebSiteUrl = "shetabWebSiteUrl";
shetab.tokens.SEProperty.mediaPositionGrabMode = "mediaPositionGrabMode";
shetab.tokens.SEProperty.contentsRoot = "contentsRoot";
shetab.tokens.SEMethod = function ()
 {
};
shetab.tokens.SEMethod.getPropertyBag = "getPropertyBag";
shetab.tokens.SEMethod.setSelectedItem = "setSelectedItem";
shetab.tokens.SEMethod.getDocumentInfoByLink = "getDocumentInfoByLink";
shetab.tokens.SEMethod.getDocumentInfoByUrl = "getDocumentInfoByUrl";
shetab.tokens.SEMethod.index = "index";
shetab.tokens.SEMethod.openUrl = "openUrl";
shetab.tokens.SEMethod.search = "search";
shetab.tokens.SEMethod.getPromptFont = "getPromptFont";
shetab.tokens.SEMethod.getPromptColor = "getPromptColor";
shetab.tokens.SEMethod.exportFiles = "exportFiles";
shetab.tokens.SEMethod.printFiles = "printFiles";
shetab.tokens.SEMethod.navigateDocument = "navigateDocument";
shetab.tokens.SEMethod.navigatePageLabel = "navigatePageLabel";
shetab.tokens.SEMethod.playSound = "playSound";
shetab.tokens.SEMethod.localizeText = "localizeText";
shetab.tokens.SEMethod.getUrlFromLink = "getUrlFromLink";
shetab.tokens.SEMethod.getLinkFromUrl = "getLinkFromUrl";
shetab.tokens.SEMethod.getResource = "getResource";
shetab.tokens.SEMethod.getPromptFolder = "getPromptFolder";
shetab.tokens.SEMethod.getPromptFileOpen = "getPromptFileOpen";
shetab.tokens.SEMethod.sendCustomNotify = "sendCustomNotify";
shetab.tokens.SEMethod.getTopicIdBookOwner = "getTopicIdBookOwner";
shetab.tokens.SEMethod.getTopic = "getTopic";
shetab.tokens.SEMethod.findTopic = "findTopic";
shetab.tokens.SEMethod.getCommandStatus = "getCommandStatus";
shetab.tokens.SEMethod.canExecuteCommand = "canExecuteCommand";
shetab.tokens.SEMethod.executeCommand = "executeCommand";
shetab.tokens.SEMethod.canGetProperty = "canGetProperty";
shetab.tokens.SEMethod.canSetProperty = "canSetProperty";
shetab.SEReaderInitializer = function ()
 {
    this.config = null;
    this.options = null;
    this.profileUrl = null;
    this._finishHandler = null;
};
shetab.SEReaderInitializer.prototype.start = function (finishHandler)
 {
    this.profileUrl = shetab.common.Uri.combine(shetab.SESystem.get_current().get_userProfileFolderUrl(), "Shetab/eBook/5.0/Reader/");
    this._finishHandler = finishHandler;
    this.config = new shetab.config.SEConfig(shetab.common.Uri.combine(shetab.SEEngine.get_current().startupInfo.get_rootUrl(), "Reader/Config.xml"));
    this.config.load($CreateAnonymousDelegate(this, function (success)
    {
        if (success)
            this.onConfigReady();
    }));
};
shetab.SEReaderInitializer.prototype.onConfigReady = function ()
 {
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.SEStartupInfo = function ()
 {
    this._projectUrl = null;
    this._rootUrl = null;
};
shetab.SEStartupInfo.prototype.get_projectUrl = function ()
 {
    return this._projectUrl;
};
shetab.SEStartupInfo.prototype.set_projectUrl = function (value)
 {
    this._projectUrl = value;
};
Object.defineProperty(shetab.SEStartupInfo.prototype, "projectUrl", {get: shetab.SEStartupInfo.prototype.get_projectUrl, set: shetab.SEStartupInfo.prototype.set_projectUrl, enumerable: true});
shetab.SEStartupInfo.prototype.get_rootUrl = function ()
 {
    return this._rootUrl;
};
shetab.SEStartupInfo.prototype.set_rootUrl = function (value)
 {
    this._rootUrl = value;
};
Object.defineProperty(shetab.SEStartupInfo.prototype, "rootUrl", {get: shetab.SEStartupInfo.prototype.get_rootUrl, set: shetab.SEStartupInfo.prototype.set_rootUrl, enumerable: true});
shetab.SEStartupInfo.prototype.get_configUrl = function ()
 {
    return shetab.common.Uri.combine(this.get_rootUrl(), "Reader/Commands.xml");
};
Object.defineProperty(shetab.SEStartupInfo.prototype, "configUrl", {get: shetab.SEStartupInfo.prototype.get_configUrl, enumerable: true});
shetab.SETemplate = function ()
 {
};
shetab.SEApp = function (engine)
 {
    this._engine = null;
    this._system = null;
    if (shetab.SEApp.get_current() !== null)
        throw new Error("Only one SEApp can be created!");
    shetab.SEApp.set_current(this);
    this.set_system(new shetab.SESystem());
    shetab.SESystem.set_current(this.get_system());
    this.set_engine(engine);
};
shetab.SEApp._current = null;
shetab.SEApp.get_current = function ()
 {
    return shetab.SEApp._current;
};
shetab.SEApp.set_current = function (value)
 {
    shetab.SEApp._current = value;
};
Object.defineProperty(shetab.SEApp, "current", {get: shetab.SEApp.get_current, set: shetab.SEApp.set_current, enumerable: true});
shetab.SEApp.prototype.get_engine = function ()
 {
    return this._engine;
};
shetab.SEApp.prototype.set_engine = function (value)
 {
    this._engine = value;
};
Object.defineProperty(shetab.SEApp.prototype, "engine", {get: shetab.SEApp.prototype.get_engine, set: shetab.SEApp.prototype.set_engine, enumerable: true});
shetab.SEApp.prototype.get_system = function ()
 {
    return this._system;
};
shetab.SEApp.prototype.set_system = function (value)
 {
    this._system = value;
};
Object.defineProperty(shetab.SEApp.prototype, "system", {get: shetab.SEApp.prototype.get_system, set: shetab.SEApp.prototype.set_system, enumerable: true});
shetab.SEApp.prototype.initialize = function ()
 {
    this.get_engine().add_ready($CreateDelegate(this, this.engine_initialized));
    this.get_engine().initialize();
};
shetab.SEApp.prototype.engine_initialized = function ()
 {
};
shetab.SEReaderApp = function ()
 {
    shetab.SEApp.call(this, new shetab.SEReaderEngine());
};
shetab.SEReaderApp.prototype.initialize = function ()
 {
    shetab.SEApp.prototype.initialize.call(this);
};
$Inherit(shetab.SEReaderApp, shetab.SEApp);
function shetabEbookSendDataToEngine(message)
 {
    return shetab.SEEngine.get_current() !== null ? shetab.SEEngine.get_current().processIncomingMessage$$String(message) : "";
};
if (typeof(shetab.SEEngine) == "undefined")
    shetab.SEEngine = {};

shetab.SEEngine.CommandHandlerStates = function ()
 {
    this.zoom = null;
    this.zoomMode = null;
    this.mediaPosition = null;
    this.mediaState = null;
    this.mediaLength = null;
};
shetab.SESystem = function ()
 {
};
shetab.SESystem._current = null;
shetab.SESystem.get_current = function ()
 {
    return shetab.SESystem._current;
};
shetab.SESystem.set_current = function (value)
 {
    shetab.SESystem._current = value;
};
Object.defineProperty(shetab.SESystem, "current", {get: shetab.SESystem.get_current, set: shetab.SESystem.set_current, enumerable: true});
shetab.SESystem.prototype.get_userProfileFolderUrl = function ()
 {
    return "file:///C:/Users/Madnik7/AppData/Local/Shetab/eBooks/Creator/";
};
Object.defineProperty(shetab.SESystem.prototype, "userProfileFolderUrl", {get: shetab.SESystem.prototype.get_userProfileFolderUrl, enumerable: true});
shetab.SESystem.prototype.get_tempFolderUrl = function ()
 {
    return "file:///C:/Users/Madnik7/AppData/Local/temp/Shetab/eBooks/Creator/";
};
Object.defineProperty(shetab.SESystem.prototype, "tempFolderUrl", {get: shetab.SESystem.prototype.get_tempFolderUrl, enumerable: true});
shetab.SESystem.prototype.deleteFile = function (fileName)
 {
    console.warn("deleting: " + fileName);
    return new shetab.common.error.NotImplementedError().toString();
};
shetab.SESystem.prototype.writeBinaryFile = function (fileName, data)
 {
    console.warn("writeBinaryFile not implemented: " + fileName);
    return new shetab.common.error.NotImplementedError().toString();
};
shetab.SESystem.prototype.writeTextFile = function (fileName, text)
 {
    console.warn("writeTextFile not implemented: " + fileName);
    return new shetab.common.error.NotImplementedError().toString();
};
shetab.SESystem.prototype.get_localFontNames = function ()
 {
    var fonts = "Arial#$$;Geneva#$$;Sans-Serif#$$;Tahoma#$$;Times New Roman#$$;Verdana";
    return fonts.split("#$$;");
};
Object.defineProperty(shetab.SESystem.prototype, "localFontNames", {get: shetab.SESystem.prototype.get_localFontNames, enumerable: true});
if (typeof(shetab) == "undefined")
    var shetab = {};
if (typeof(shetab.api) == "undefined")
    shetab.api = {};
shetab.api.SECreatorAgent = function ()
{
    shetab.api.SEApiInvoker.call(this);
};
shetab.api.SECreatorAgent.prototype.get_typeName = function ()
{
    return "CreatorAgent";
};
Object.defineProperty(shetab.api.SECreatorAgent.prototype, "typeName", {get: shetab.api.SECreatorAgent.prototype.get_typeName, enumerable: true});
shetab.api.SECreatorAgent.prototype.fireProjectChanged = function ()
{
    var msg = (function ()
    {
        var $v1 = new shetab.SEMessage();
        $v1.methodName = "fireProjectChanged";
        return $v1;
    }).call(this);
    this.invoke(msg);
};
shetab.api.SECreatorAgent.prototype.getAllCommandNames = function ()
{
    var ret = shetab.api.SEApiInvoker.prototype.getAllCommandNames.call(this);
    return ret;
};
$Inherit(shetab.api.SECreatorAgent, shetab.api.SEApiInvoker);
shetab.api.SECreatorCore = function (message)
{
    this._message = null;
    this.set_message(message);
};
shetab.api.SECreatorCore.prototype.get_message = function ()
{
    return this._message;
};
shetab.api.SECreatorCore.prototype.set_message = function (value)
{
    this._message = value;
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "message", {get: shetab.api.SECreatorCore.prototype.get_message, set: shetab.api.SECreatorCore.prototype.set_message, enumerable: true});
shetab.api.SECreatorCore.prototype.get_allCultures = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.set_allCultures = function (value)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "allCultures", {get: shetab.api.SECreatorCore.prototype.get_allCultures, set: shetab.api.SECreatorCore.prototype.set_allCultures, enumerable: true});
shetab.api.SECreatorCore.prototype.get_autoCheckUpdate = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.set_autoCheckUpdate = function (value)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "autoCheckUpdate", {get: shetab.api.SECreatorCore.prototype.get_autoCheckUpdate, set: shetab.api.SECreatorCore.prototype.set_autoCheckUpdate, enumerable: true});
shetab.api.SECreatorCore.prototype.get_autoSave = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.set_autoSave = function (value)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "autoSave", {get: shetab.api.SECreatorCore.prototype.get_autoSave, set: shetab.api.SECreatorCore.prototype.set_autoSave, enumerable: true});
shetab.api.SECreatorCore.prototype.get_creatorDownloadPageUrl = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "creatorDownloadPageUrl", {get: shetab.api.SECreatorCore.prototype.get_creatorDownloadPageUrl, enumerable: true});
shetab.api.SECreatorCore.prototype.get_creatorLicenseeEdition = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "creatorLicenseeEdition", {get: shetab.api.SECreatorCore.prototype.get_creatorLicenseeEdition, enumerable: true});
shetab.api.SECreatorCore.prototype.get_creatorLicenseeId = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "creatorLicenseeId", {get: shetab.api.SECreatorCore.prototype.get_creatorLicenseeId, enumerable: true});
shetab.api.SECreatorCore.prototype.get_creatorLicenseeName = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "creatorLicenseeName", {get: shetab.api.SECreatorCore.prototype.get_creatorLicenseeName, enumerable: true});
shetab.api.SECreatorCore.prototype.get_creatorLicenseeTokenId = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "creatorLicenseeTokenId", {get: shetab.api.SECreatorCore.prototype.get_creatorLicenseeTokenId, enumerable: true});
shetab.api.SECreatorCore.prototype.get_creatorPadFileUrl = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "creatorPadFileUrl", {get: shetab.api.SECreatorCore.prototype.get_creatorPadFileUrl, enumerable: true});
shetab.api.SECreatorCore.prototype.get_creatorVersion = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "creatorVersion", {get: shetab.api.SECreatorCore.prototype.get_creatorVersion, enumerable: true});
shetab.api.SECreatorCore.prototype.get_isTrialEdition = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "isTrialEdition", {get: shetab.api.SECreatorCore.prototype.get_isTrialEdition, enumerable: true});
shetab.api.SECreatorCore.prototype.get_openLastProjectOnStartup = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.set_openLastProjectOnStartup = function (value)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "openLastProjectOnStartup", {get: shetab.api.SECreatorCore.prototype.get_openLastProjectOnStartup, set: shetab.api.SECreatorCore.prototype.set_openLastProjectOnStartup, enumerable: true});
shetab.api.SECreatorCore.prototype.get_recentProjects = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "recentProjects", {get: shetab.api.SECreatorCore.prototype.get_recentProjects, enumerable: true});
shetab.api.SECreatorCore.prototype.get_taskPanelVisible = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.set_taskPanelVisible = function (value)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "taskPanelVisible", {get: shetab.api.SECreatorCore.prototype.get_taskPanelVisible, set: shetab.api.SECreatorCore.prototype.set_taskPanelVisible, enumerable: true});
shetab.api.SECreatorCore.prototype.get_workspaceFolder = function ()
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.set_workspaceFolder = function (value)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "workspaceFolder", {get: shetab.api.SECreatorCore.prototype.get_workspaceFolder, set: shetab.api.SECreatorCore.prototype.set_workspaceFolder, enumerable: true});
shetab.api.SECreatorCore.prototype.createAction = function (pluginId, bookId, targetFolder)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.createProject = function (param)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.getActions = function (bookId)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.getCreatorResource = function (resourceFile, resourceKey)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.getDefaultNewProjectFolder = function (projectName)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.getPromptNewProjectFolder = function (initFolder)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.getPromptText = function (initText, title, multiline, cancelValue)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.openProject = function (file)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.setTopicLink = function (topicId, link)
{
    throw $CreateException(new shetab.common.error.NotImplementedError(), new Error());
};
shetab.api.SECreatorCore.prototype.get_localFontNames = function ()
{
    return shetab.SESystem.get_current().get_localFontNames();
};
Object.defineProperty(shetab.api.SECreatorCore.prototype, "localFontNames", {get: shetab.api.SECreatorCore.prototype.get_localFontNames, enumerable: true});
shetab.api.SECreatorApi = function (message)
{
    this._creatorCore = null;
    this.set_creatorCore(new shetab.api.SECreatorCore(message));
};
shetab.api.SECreatorApi.prototype.get_creatorCore = function ()
{
    return this._creatorCore;
};
shetab.api.SECreatorApi.prototype.set_creatorCore = function (value)
{
    this._creatorCore = value;
};
Object.defineProperty(shetab.api.SECreatorApi.prototype, "creatorCore", {get: shetab.api.SECreatorApi.prototype.get_creatorCore, set: shetab.api.SECreatorApi.prototype.set_creatorCore, enumerable: true});
shetab.api.SECreatorMessageParser = function ()
{
    shetab.api.SEMessageParser.call(this);
};
shetab.api.SECreatorMessageParser.prototype.getMessageForBase = function (message)
{
    if (message.typeName === "CreatorCore")
        message.typeName = "Core";
    return message;
};
shetab.api.SECreatorMessageParser.prototype.processProperty = function (message, propertyName, propertyValue)
{
    var ret = shetab.api.SECreatorMessageParser.doProcessProperty(message, propertyName, propertyValue);
    if (ret === shetab.api.SEMessageParser.c_unhandled)
        ret = shetab.api.SEMessageParser.prototype.processProperty.call(this, this.getMessageForBase(message), propertyName, propertyValue);
    return ret;
};
shetab.api.SECreatorMessageParser.prototype.processMethod = function (message)
{
    var ret = shetab.api.SECreatorMessageParser.doProcessMethod(message);
    if (ret === shetab.api.SEMessageParser.c_unhandled)
        ret = shetab.api.SEMessageParser.prototype.processMethod.call(this, this.getMessageForBase(message));
    return ret;
};
shetab.api.SECreatorMessageParser.doProcessProperty = function (message, propertyName, propertyValue)
{
    var isGet = propertyValue === null;
    var api = new shetab.api.SECreatorApi(message);
    if (message.typeName === "CreatorCore")
    {
        if (propertyName === "localFontNames")
        {
            if (isGet)
            {
                var res = api.creatorCore.localFontNames;
                return (res === null) ? null : shetab.SEMessage.array_toString(res);
            }
            throw new Error("localFontNames property is read-only!");
        }
        if (propertyName === "taskPanelVisible")
        {
            if (isGet)
            {
                var res = api.creatorCore.taskPanelVisible;
                return (res === null) ? null : res.toString();
            }
            api.creatorCore.taskPanelVisible = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "recentProjects")
        {
            if (isGet)
            {
                var res = api.creatorCore.recentProjects;
                return res;
            }
            throw new Error("recentProjects property is read-only!");
        }
        if (propertyName === "allCultures")
        {
            if (isGet)
            {
                var res = api.creatorCore.allCultures;
                return res;
            }
            api.creatorCore.allCultures = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "isTrialEdition")
        {
            if (isGet)
            {
                var res = api.creatorCore.isTrialEdition;
                return (res === null) ? null : res.toString();
            }
            throw new Error("isTrialEdition property is read-only!");
        }
        if (propertyName === "autoSave")
        {
            if (isGet)
            {
                var res = api.creatorCore.autoSave;
                return (res === null) ? null : res.toString();
            }
            api.creatorCore.autoSave = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "openLastProjectOnStartup")
        {
            if (isGet)
            {
                var res = api.creatorCore.openLastProjectOnStartup;
                return (res === null) ? null : res.toString();
            }
            api.creatorCore.openLastProjectOnStartup = shetab.common.Convert.toBoolean(propertyValue);
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "workspaceFolder")
        {
            if (isGet)
            {
                var res = api.creatorCore.workspaceFolder;
                return res;
            }
            api.creatorCore.workspaceFolder = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
        if (propertyName === "creatorLicenseeTokenId")
        {
            if (isGet)
            {
                var res = api.creatorCore.creatorLicenseeTokenId;
                return res;
            }
            throw new Error("creatorLicenseeTokenId property is read-only!");
        }
        if (propertyName === "creatorLicenseeId")
        {
            if (isGet)
            {
                var res = api.creatorCore.creatorLicenseeId;
                return res;
            }
            throw new Error("creatorLicenseeId property is read-only!");
        }
        if (propertyName === "creatorLicenseeName")
        {
            if (isGet)
            {
                var res = api.creatorCore.creatorLicenseeName;
                return res;
            }
            throw new Error("creatorLicenseeName property is read-only!");
        }
        if (propertyName === "creatorLicenseeEdition")
        {
            if (isGet)
            {
                var res = api.creatorCore.creatorLicenseeEdition;
                return res;
            }
            throw new Error("creatorLicenseeEdition property is read-only!");
        }
        if (propertyName === "creatorVersion")
        {
            if (isGet)
            {
                var res = api.creatorCore.creatorVersion;
                return res;
            }
            throw new Error("creatorVersion property is read-only!");
        }
        if (propertyName === "creatorDownloadPageUrl")
        {
            if (isGet)
            {
                var res = api.creatorCore.creatorDownloadPageUrl;
                return res;
            }
            throw new Error("creatorDownloadPageUrl property is read-only!");
        }
        if (propertyName === "creatorPadFileUrl")
        {
            if (isGet)
            {
                var res = api.creatorCore.creatorPadFileUrl;
                return res;
            }
            throw new Error("creatorPadFileUrl property is read-only!");
        }
        if (propertyName === "autoCheckUpdate")
        {
            if (isGet)
            {
                var res = api.creatorCore.autoCheckUpdate;
                return res;
            }
            api.creatorCore.autoCheckUpdate = propertyValue;
            return shetab.SEMessage.c_undefined;
        }
    }
    return shetab.SEMessage.c_unhandled;
};
shetab.api.SECreatorMessageParser.doProcessMethod = function (message)
{
    var api = new shetab.api.SECreatorApi(message);
    if (message.typeName === "CreatorCore")
    {
        if (message.methodName === "getCreatorResource")
        {
            var res = api.creatorCore.getCreatorResource(message.getParam("resourceFile"), message.getParam("resourceKey"));
            return res;
        }
        if (message.methodName === "openProject")
        {
            api.creatorCore.openProject(message.getParam("file"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "getPromptNewProjectFolder")
        {
            var res = api.creatorCore.getPromptNewProjectFolder(message.getParam("initFolder"));
            return res;
        }
        if (message.methodName === "getDefaultNewProjectFolder")
        {
            var res = api.creatorCore.getDefaultNewProjectFolder(message.getParam("projectName"));
            return res;
        }
        if (message.methodName === "getPromptText")
        {
            var res = api.creatorCore.getPromptText(message.getParam("initText"), message.getParam("title"), message.getParam("multiline"), message.getParam("cancelValue"));
            return res;
        }
        if (message.methodName === "createAction")
        {
            var res = api.creatorCore.createAction(message.getParam("pluginId"), message.getParam("bookId"), message.getParam("targetFolder"));
            return res;
        }
        if (message.methodName === "getActions")
        {
            var res = api.creatorCore.getActions(message.getParam("bookId"));
            return res;
        }
        if (message.methodName === "createProject")
        {
            api.creatorCore.createProject(message.getParam("param"));
            return shetab.SEMessage.c_undefined;
        }
        if (message.methodName === "setTopicLink")
        {
            api.creatorCore.setTopicLink(message.getParam("topicId"), message.getParam("link"));
            return shetab.SEMessage.c_undefined;
        }
    }
    return shetab.SEMessage.c_unhandled;
};
$Inherit(shetab.api.SECreatorMessageParser, shetab.api.SEMessageParser);
if (typeof(shetab.config) == "undefined")
    shetab.config = {};
shetab.config.SECreatorConfig = function (configUrl)
{
    shetab.config.SEConfig.call(this, configUrl);
};
$Inherit(shetab.config.SECreatorConfig, shetab.config.SEConfig);
shetab.SECreatorEngine = function ()
{
    this._creatorConfig = null;
    shetab.SEEngine.call(this);
    this.set_messageParser(new shetab.api.SECreatorMessageParser());
    this.set_isDesignMode(true);
};
shetab.SECreatorEngine.prototype.get_creatorConfig = function ()
{
    return this._creatorConfig;
};
shetab.SECreatorEngine.prototype.set_creatorConfig = function (value)
{
    this._creatorConfig = value;
};
Object.defineProperty(shetab.SECreatorEngine.prototype, "creatorConfig", {get: shetab.SECreatorEngine.prototype.get_creatorConfig, set: shetab.SECreatorEngine.prototype.set_creatorConfig, enumerable: true});
shetab.SECreatorEngine.get_current = function ()
{
    return shetab.SEEngine.get_current();
};
Object.defineProperty(shetab.SECreatorEngine, "current", {get: shetab.SECreatorEngine.get_current, enumerable: true});
shetab.SECreatorEngine.prototype.get_startupModuleEntityUrls = function ()
{
    var ret = shetab.SEEngine.prototype.get_startupModuleEntityUrls.call(this);
    for (var $i2 = 0, $t2 = this.get_creatorConfig().startupModuleEntityUrls, $l2 = $t2.length, item = $t2[$i2]; $i2 < $l2; $i2++, item = $t2[$i2])
        ret.push(item);
    return ret;
};
Object.defineProperty(shetab.SECreatorEngine.prototype, "startupModuleEntityUrls", {get: shetab.SECreatorEngine.prototype.get_startupModuleEntityUrls, enumerable: true});
shetab.SECreatorEngine.prototype.initialize = function ()
{
    shetab.SEEngine.prototype.initialize.call(this);
    var initializer = new shetab.SECreatorInitializer();
    initializer.start($CreateAnonymousDelegate(this, function ()
    {
        this.set_profileFolderUrl(initializer.profileFolderUrl);
        this.set_options(initializer.creatorOptions);
        this.fireReadyEvent();
    }));
};
shetab.SECreatorEngine.prototype.onReady = function ()
{
    shetab.SEEngine.prototype.onReady.call(this);
    this.test();
    this.moduleManager.openDocument(shetab.common.Uri.combine(this.get_creatorConfig().get_configUrl(), "Engine/test/test.html"), null , null , "projectPanel", true);
};
shetab.SECreatorEngine.prototype.update = function ()
{
    shetab.SEEngine.prototype.update.call(this);
    for (var $i3 = 0, $t3 = this.get_creatorConfig().modules, $l3 = $t3.length, item = $t3[$i3]; $i3 < $l3; $i3++, item = $t3[$i3])
        this.get_modules()[item.get_id().toLowerCase()] = item;
};
shetab.SECreatorEngine.prototype.getCoreProperty = function (propertyName)
{
    var message = (function ()
    {
        var $v2 = new shetab.SEMessage();
        $v2.typeName = "CreatorCore";
        $v2.methodName = "getProperty";
        return $v2;
    }).call(this);
    message.setParam("propertyName", propertyName);
    return this.get_messageParser().processMessage$$SEMessage(message);
};
shetab.SECreatorEngine.prototype.test = function ()
{
};
$Inherit(shetab.SECreatorEngine, shetab.SEEngine);
shetab.SECreatorInitializer = function ()
{
    this.creatorOptions = null;
    this.profileFolderUrl = null;
    this._finishHandler = null;
};
shetab.SECreatorInitializer.get_config = function ()
{
    return shetab.SEEngine.get_current().get_config();
};
shetab.SECreatorInitializer.set_config = function (value)
{
    shetab.SEEngine.get_current().set_config(value);
};
Object.defineProperty(shetab.SECreatorInitializer, "config", {get: shetab.SECreatorInitializer.get_config, set: shetab.SECreatorInitializer.set_config, enumerable: true});
shetab.SECreatorInitializer.get_creatorConfig = function ()
{
    return shetab.SECreatorEngine.get_current().get_creatorConfig();
};
shetab.SECreatorInitializer.set_creatorConfig = function (value)
{
    shetab.SECreatorEngine.get_current().set_creatorConfig(value);
};
Object.defineProperty(shetab.SECreatorInitializer, "creatorConfig", {get: shetab.SECreatorInitializer.get_creatorConfig, set: shetab.SECreatorInitializer.set_creatorConfig, enumerable: true});
shetab.SECreatorInitializer.prototype.start = function (finishHandler)
{
    this.profileFolderUrl = shetab.common.Uri.combine(shetab.SESystem.get_current().get_userProfileFolderUrl(), "Shetab/eBook/5.0/Creator/");
    this._finishHandler = finishHandler;
    var wait = new shetab.SEWait(2);
    shetab.SECreatorInitializer.set_config(new shetab.config.SEConfig(shetab.common.Uri.combine(shetab.SEEngine.get_current().startupInfo.get_rootUrl(), "Reader/Config.xml")));
    shetab.SECreatorInitializer.get_config().load($CreateAnonymousDelegate(this, function (success)
    {
        if (!success)
            throw new Error("Could not load config!");
        wait.release();
    }));
    shetab.SECreatorInitializer.set_creatorConfig(new shetab.config.SECreatorConfig(shetab.common.Uri.combine(shetab.SEEngine.get_current().startupInfo.get_rootUrl(), "Creator/Config.xml")));
    shetab.SECreatorInitializer.get_creatorConfig().load($CreateAnonymousDelegate(this, function (success)
    {
        if (!success)
            throw new Error("Could not load creatorConfig!");
        wait.release();
    }));
    wait.waitAll($CreateDelegate(this, this.onConfigReady));
};
shetab.SECreatorInitializer.prototype.onConfigReady = function ()
{
    var wait = new shetab.SEWait(2);
    shetab.SEEngine.get_current().resourceManager.addResourceFolder(shetab.SECreatorInitializer.get_config().resourceUrls[shetab.SECreatorInitializer.get_config().get_baseCulture()], shetab.SECreatorInitializer.get_config().get_baseCulture(), shetab.SEGlobal.moduleName_reader, $CreateAnonymousDelegate(this, function (success)
    {
        wait.release();
    }));
    shetab.SEEngine.get_current().resourceManager.addResourceFolder(shetab.SECreatorInitializer.get_creatorConfig().resourceUrls[shetab.SECreatorInitializer.get_creatorConfig().get_baseCulture()], shetab.SECreatorInitializer.get_creatorConfig().get_baseCulture(), shetab.SEGlobal.moduleName_creator, $CreateAnonymousDelegate(this, function (success)
    {
        wait.release();
    }));
    this.creatorOptions = new shetab.SECreatorOptions();
    wait.waitAll($CreateDelegate(this, this.onOptionsReady));
};
shetab.SECreatorInitializer.prototype.onOptionsReady = function ()
{
    var wait = new shetab.SEWait();
    var bestCulture = shetab.common.CultureInfo.getBestCulture(shetab.SEUtility.jsObjectKeyToArray(shetab.SECreatorInitializer.get_config().resourceUrls), this.creatorOptions.get_uiCulture(), shetab.SEGlobal.defaultCulture);
    var bestCreatorCulture = shetab.common.CultureInfo.getBestCulture(shetab.SEUtility.jsObjectKeyToArray(shetab.SECreatorInitializer.get_creatorConfig().resourceUrls), this.creatorOptions.get_uiCulture(), shetab.SEGlobal.defaultCulture);
    if (bestCulture !== shetab.SECreatorInitializer.get_config().get_baseCulture())
    {
        wait.add();
        shetab.SEEngine.get_current().resourceManager.addResourceFolder(shetab.SECreatorInitializer.get_config().resourceUrls[bestCulture], bestCulture, shetab.SEGlobal.moduleName_reader, $CreateAnonymousDelegate(this, function (success)
        {
            wait.release();
        }));
    }
    if (bestCreatorCulture !== shetab.SECreatorInitializer.get_creatorConfig().get_baseCulture())
    {
        wait.add();
        shetab.SEEngine.get_current().resourceManager.addResourceFolder(shetab.SECreatorInitializer.get_creatorConfig().resourceUrls[bestCreatorCulture], bestCreatorCulture, shetab.SEGlobal.moduleName_creator, $CreateAnonymousDelegate(this, function (success)
        {
            wait.release();
        }));
    }
    wait.waitAll($CreateDelegate(this, this.onCultureResourceReady));
};
shetab.SECreatorInitializer.prototype.onCultureResourceReady = function ()
{
    var wait = new shetab.SEWait(2);
    shetab.SECreatorInitializer.get_config().loadMoudles($CreateAnonymousDelegate(this, function (success)
    {
        wait.release();
    }));
    shetab.SECreatorInitializer.get_creatorConfig().loadMoudles($CreateAnonymousDelegate(this, function (success)
    {
        wait.release();
    }));
    var wait2 = new shetab.SEWait(2);
    wait.waitAll($CreateAnonymousDelegate(this, function ()
    {
        shetab.SEEngine.get_current().update();
        shetab.SECreatorInitializer.get_config().loadModuleEntities($CreateAnonymousDelegate(this, function (success)
        {
            wait2.release();
        }));
        shetab.SECreatorInitializer.get_creatorConfig().loadModuleEntities($CreateAnonymousDelegate(this, function (success)
        {
            wait2.release();
        }));
    }));
    wait2.waitAll(this._finishHandler);
};
shetab.SECreatorOptions = function ()
{
    this._uiCulture = "en-US";
    shetab.SEOptions.call(this);
};
shetab.SECreatorOptions.prototype.get_uiCulture = function ()
{
    return this._uiCulture;
};
shetab.SECreatorOptions.prototype.set_uiCulture = function (value)
{
    (function ()
    {
        this._uiCulture = {Value: this._uiCulture};
        var $res = this.get_engine().updateProperty$1$$T$$T$$Object(this._uiCulture, value, shetab.tokens.SEProperty.uiCulture);
        this._uiCulture = this._uiCulture.Value;
        return $res;
    }).call(this);
};
Object.defineProperty(shetab.SECreatorOptions.prototype, "uiCulture", {get: shetab.SECreatorOptions.prototype.get_uiCulture, set: shetab.SECreatorOptions.prototype.set_uiCulture, enumerable: true});
$Inherit(shetab.SECreatorOptions, shetab.SEOptions);
shetab.SECreatorApp = function ()
{
    shetab.SEApp.call(this, new shetab.SECreatorEngine());
};
$Inherit(shetab.SECreatorApp, shetab.SEApp);
