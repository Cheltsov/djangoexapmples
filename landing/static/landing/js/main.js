$(document).ready(function(){

    var form = $('#form_buying_product');

    form.on("submit",function(event){
        event.preventDefault();
        var nmb = form.children("input[name='number']").val();
        var product_id = $("#submit_btn").attr('data-product-id');
        var product_name = $("#submit_btn").attr('data-product-name');
        var product_price = $("#submit_btn").attr('data-product-price');

        var data = {
            "product_id":product_id,
            "nmb":nmb,
            "csrfmiddlewaretoken":form.children("input[name='csrfmiddlewaretoken']").val()
        };
        var url = form.attr('action');

        console.log(data);

        $.ajax({
            url:url,
            type:"post",
            data: data,
            success:function(data){
                console.log(data);
                $(".basket").children('ul').empty();
                $("#basket-btn").children("span").html(data.products_total_nmb);
                $.each(data.products, function(k,v){
                    $(".basket").children('ul').append("<li>"+v.name+", "+v.nmb+" шт. по "+v.price+" UAH <br><span data-product-id='"+v.id+"' class='delete-item'>Удалить</span></li>")
                });
            },
            error:function(){
                alert("Ошибка");
            }
        });


        return false;
    });

    $("#basket-btn").on('mouseover',function(){
        if($(".basket>ul>li").length>0) $(".basket").show();
    });

    $(document).on('click',".delete-item", function(){
        $(this).parent().remove();
        if($(".basket>ul>li").length<1) $(".basket").hide();

        var data = {
            "product_id":$(".basket>ul>li").children("span").attr('data-product-id'),
            "csrfmiddlewaretoken":form.children("input[name='csrfmiddlewaretoken']").val(),
            "is_delete":"1"
        };

        var url = form.attr('action');

        $.ajax({
            url:url,
            type:"post",
            data:data,
            success:function(data){
                console.log(data);
            },
            error:function(){
              alert("ER");
            },
        });
    });
});