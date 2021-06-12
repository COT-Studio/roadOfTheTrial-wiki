var sml = {
    parse:function(str) {
        r = "";
        for(i = 0;i <= str.length;i++) {
            x = str[i];
            switch(x) {
                case "#"://标题<h2>
                    var id = "";//元素id
                    var inner = "";//元素内容
                    i++;
                    for (; str[i] != "&"; i++) {inner += str[i]};
                    i += 5;
                    for (; str[i] != "#"; i++) {id += str[i]};
                    i++;
                    r += '<h2 id="' + id + '">' + inner + '</h2>';
                break;
                case "["://图像<img>
                    var src = "";//路径
                    var width = "";//宽度
                    var height = "";//高度
                    i++;
                    for (; str[i] != "&"; i++) {src += str[i]};
                    i += 5;
                    for (; str[i] != "&"; i++) {width += str[i]};
                    i += 5;
                    for (; str[i] != "]"; i++) {height += str[i]};
                    i++;
                    r += '<img src="' + src + '" width="' + width + '" height="' + height + '" /';
                break;
                case "-"://段落<p>
                    var inner = "";//元素内容
                    i++;
                    for (; str[i] != "-"; i++) {
                        if (str[i] === "/") {//斜体字<i>
                            i++;
                            inner += "<i>";
                            for (; str[i] != "/"; i++) {inner += str[i]};
                            inner += "</i>";
                        } else if (str[i] === "_") {//粗体字<b>
                            i++;
                            inner += "<b>";
                            for (; str[i] != "_"; i++) {inner += str[i]};
                            inner += "</b>";
                        } else if (str[i] === "{") {
                            var href = "";//目标
                            var ainner = "";//<a>的元素内容
                            i++;
                            for (; str[i] != "&"; i++) {ainner += str[i]};
                            i += 5;
                            for (; str[i] != "}"; i++) {href += str[i]};
                            inner += '<a href="' + href + '">' + ainner + '</a>';
                        } else {
                            inner += str[i];
                        }
                    };
                    i++;
                    r += '<p>' + inner + '</p>';
                break;
                case "*"://列表<ul>
                    var inner = "";//元素内容
                    i++;
                    for (; str[i] != "*"; i++) {
                        if (str[i] === "-") {//列表项<li>
                            i++;
                            inner += "<li>";
                            for (; str[i] != "-"; i++) {
                                if (str[i] === "/") {//斜体字<i>
                                    i++;
                                    inner += "<i>";
                                    for (; str[i] != "/"; i++) {inner += str[i]};
                                    inner += "</i>";
                                } else if (str[i] === "_") {//粗体字<b>
                                    i++;
                                    inner += "<b>";
                                    for (; str[i] != "_"; i++) {inner += str[i]};
                                    inner += "</b>";
                                } else if (str[i] === "{") {
                                    var href = "";//目标
                                    var ainner = "";//<a>的元素内容
                                    i++;
                                    for (; str[i] != "&"; i++) {ainner += str[i]};
                                    i += 5;
                                    for (; str[i] != "}"; i++) {href += str[i]};
                                    inner += '<a href="' + href + '">' + ainner + '</a>';
                                } else {
                                    inner += str[i];
                                }
                            };
                            inner += "</li>";
                        } else {
                            inner += str[i];
                        }
                    };
                    i++;
                    r += '<ul>' + inner + '</ul>';
                break;
            }//switch
        };//for
        return r;
    },//parse()
    
    wikify:function() {
        console.log("开始运行sml");
        var e = document.getElementById("section");
        e.innerHTML = this.parse(e.innerHTML);
        console.log("运行完毕")
    }
}//sml

console.log("SML.js已载入")