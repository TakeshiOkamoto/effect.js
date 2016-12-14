/**************************************************/
/*                                                */
/*     effect.js                                  */
/*                                      v0.88     */
/*                                                */
/*     Copyright 2016 Takeshi Okamoto (Japan)     */
/*                                                */
/*     Released under the MIT license             */
/*     https://github.com/TakeshiOkamoto/         */
/*                                                */
/*                            Date: 2016-12-13    */
/**************************************************/
"use strict"

////////////////////////////////////////////////////////////////////////////////
// Constant
////////////////////////////////////////////////////////////////////////////////

// コントラスト改善
var LUT_CONTRAST     = [0,1,1,2,2,3,3,3,4,4,5,5,5,6,6,7,7,7,8,8,9,9,9,10,10,11,11,11,12,12,13,13,13,14,14,15,15,15,16,16,17,17,18,19,20,20,21,22,23,24,24,25,26,27,28,28,29,30,31,32,33,33,34,35,36,37,37,38,39,40,41,41,42,43,44,45,45,46,47,48,49,50,51,53,54,55,56,57,58,59,60,62,63,64,65,66,67,68,70,71,72,73,74,75,76,77,79,80,81,82,83,85,88,91,93,95,98,101,103,105,108,111,113,115,118,121,123,125,128,129,132,136,139,142,145,149,152,155,159,162,165,168,172,175,176,177,178,180,181,182,183,184,186,187,188,189,191,192,193,194,195,197,198,199,200,201,203,204,205,206,208,209,210,211,212,212,213,213,214,215,215,216,216,217,218,218,219,219,220,221,221,222,222,223,224,224,225,225,226,227,227,228,228,229,230,230,231,231,232,233,233,234,234,235,236,236,237,237,238,238,239,239,240,240,241,241,242,242,242,243,243,244,244,245,245,246,246,247,247,248,248,249,249,249,250,250,251,251,252,252,253,253,254,254,255,255];
// 明るさを強調 
var LUT_BRIGHTNESS   = [0,1,3,5,6,8,10,12,14,16,17,19,21,23,25,26,28,30,32,34,36,37,39,41,43,45,47,48,50,52,54,56,57,59,61,63,65,67,68,70,72,73,74,76,77,79,80,81,83,84,85,87,88,90,91,92,94,95,97,98,99,101,102,103,105,106,108,109,110,112,113,114,116,117,119,120,121,123,124,126,127,128,130,131,132,134,135,137,138,139,141,142,144,145,146,148,149,150,152,153,155,156,157,158,159,159,160,161,162,162,163,164,165,165,166,167,168,168,169,170,171,171,172,173,174,174,175,176,177,177,178,179,180,180,181,182,183,183,184,185,186,186,187,188,189,189,190,191,192,192,193,194,195,195,196,197,198,198,199,200,201,201,202,203,204,204,205,206,207,207,208,209,210,210,211,212,213,214,214,215,215,216,216,217,217,218,218,219,219,220,220,221,222,222,223,223,224,224,225,225,226,226,227,227,228,228,229,229,230,231,231,232,232,233,233,234,234,235,235,236,236,237,237,238,239,239,240,240,241,241,242,242,243,243,244,244,245,245,246,246,247,248,248,249,249,250,250,251,251,252,252,253,253,254,254,255];
// 暗さを強調  
var LUT_DARKNESS     = [0,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,36,36,37,37,38,38,39,39,40,40,41,41,42,42,43,44,45,46,46,47,48,49,50,51,51,52,53,54,55,55,56,57,58,59,60,60,61,62,63,64,64,65,66,67,68,69,69,70,71,72,73,73,74,75,76,77,78,78,79,80,81,82,83,83,84,85,86,87,87,88,89,90,91,92,92,93,94,95,96,96,97,98,99,100,101,101,102,103,104,105,107,108,110,111,112,114,115,117,118,119,121,122,124,125,126,128,129,131,132,133,135,136,138,139,140,142,143,145,146,147,149,150,152,153,154,156,157,159,160,161,163,164,166,167,168,170,171,173,174,175,177,178,180,181,182,184,185,187,188,190,192,193,195,197,198,200,201,203,205,206,208,210,211,213,214,216,218,219,221,223,224,226,227,229,231,232,234,236,237,239,240,242,244,245,247,249,250,252,253,255];
// ポスタリゼーション
var LUT_POSTERIZE    = [0,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255];
// 擬似ソラリゼーション
var LUT_SOLARIZATION = [0,1,9,18,26,35,43,52,60,69,77,86,94,103,111,120,128,136,145,153,162,170,179,187,196,204,213,221,230,238,247,255,254,246,238,230,222,214,206,198,190,183,175,167,159,151,143,135,127,119,111,103,95,87,79,71,64,56,48,40,32,24,16,8,0,1,9,17,26,34,42,50,58,67,75,83,91,99,108,116,124,132,140,148,157,165,173,181,189,198,206,214,222,230,239,247,255,254,246,238,229,221,213,205,197,188,180,172,164,156,147,139,131,123,115,107,98,90,82,74,66,57,49,41,33,25,16,8,0,1,9,17,26,34,42,50,58,67,75,83,91,99,108,116,124,132,140,148,157,165,173,181,189,198,206,214,222,230,239,247,255,254,246,238,229,221,213,205,197,188,180,172,164,156,147,139,131,123,115,107,98,90,82,74,66,57,49,41,33,25,16,8,0,1,9,16,24,32,39,47,55,63,70,78,86,93,101,109,116,124,132,140,147,155,163,170,178,186,193,201,209,217,224,232,240,247,255,254,245,236,227,218,209,200,191,181,172,163,154,145,136,127,118,109,100,91,82,73,64,54,45,36,27,18,9,0];

// 昇順ソート
var ASC_SORT = function(a,b){
                            if( a < b ) return -1;
                            if( a > b ) return 1;
                            return 0;
               };
               
// 降順ソート
var DESC_SORT = function(a,b){
                              if( a > b ) return -1;
                              if( a < b ) return 1;
                              return 0;
               };
                                       
////////////////////////////////////////////////////////////////////////////////
// Generic Function
////////////////////////////////////////////////////////////////////////////////

function set255(val){
  if (val > 255) return 255;
  if (val < 0) return 0;
  return val;
}

function set255r(val){
  if (val > 255) return 255;
  if (val < 0) return 0;
  return Math.round(val);
}

// ランダム整数を発生させる
// max:最大値 min:最小値(マイナス対応)
function Random(max,min){
  return Math.floor((Math.random() * ((max + 1) - min)) + min);
}

////////////////////////////////////////////////////////////////////////////////
// Generic Function
////////////////////////////////////////////////////////////////////////////////

// グレースケール
function EffectGrayscale(source){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol,NTSC;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);     
       
      // NTSC系加重平均法を用いてグレースケール化
      NTSC = set255r(raw[sCol]    * 0.289 +
                     raw[sCol +1] * 0.586 +
                     raw[sCol +2] * 0.114 );
                               
      raw[sCol]   = NTSC;
      raw[sCol+1] = NTSC;
      raw[sCol+2] = NTSC;   
      raw[sCol+3] = 255;    
    }   
  }  
}

// セピアカラー
function EffectSepia(source){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol,NTSC;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);     
       
      // NTSC系加重平均法を用いてグレースケール化
      NTSC = set255r(raw[sCol]    * 0.289 +
                     raw[sCol +1] * 0.586 +
                     raw[sCol +2] * 0.114 );
                     
      // 色のバランスを調整する                         
      raw[sCol]   = set255(NTSC + 30);
      raw[sCol+1] = NTSC;
      raw[sCol+2] = set255(NTSC - 20);   
      raw[sCol+3] = 255;    
    }   
  }  
}

// ネガポジ
function EffectNegaposi(source){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);      
      raw[sCol]   = 255 - raw[sCol];
      raw[sCol+1] = 255 - raw[sCol+1];
      raw[sCol+2] = 255 - raw[sCol+2];   
      raw[sCol+3] = 255;    
    }   
  }  
}

// Xor
function EffectXor(source){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);      
      raw[sCol]   = raw[sCol]   ^ 128 ;
      raw[sCol+1] = raw[sCol+1] ^ 128;
      raw[sCol+2] = raw[sCol+2] ^ 128;   
      raw[sCol+3] = 255;    
    }   
  }  
}

// 画像を回転(90/180/270)させる
// option 1:90度回転(左) 2:90度回転(右) 3:180度回転
// ※90/270度は呼び出し前にdestinationの横幅/縦幅を調整する
function EffectTrun(source,destination,option){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;

  var sRow,sCol,dRow,dCol; 
  
  // 90度回転(左)
  if (option == 1){
    
    for (var y = 0; y < height; y++) {
      sRow = (y * width * 4);
      dRow = (y * 4);
      
      for (var x = 0;x < width; x++) {
        sCol = sRow + (x * 4);
        dCol = dRow + ((width -x-1) * height *4 );
          
        dst[dCol]     = src[sCol]; 
        dst[dCol + 1] = src[sCol + 1];
        dst[dCol + 2] = src[sCol + 2];   
        dst[dCol + 3] = 255;     
      }
    }
    
  // 90度回転(右)
  }else if (option == 2){
    
    for (var y = 0; y < height; y++) {
      sRow = (y * width * 4);
      dRow = ((height - y-1) * 4);
      
      for (var x = 0;x < width; x++) {
        sCol = sRow + (x * 4);
        dCol = dRow + (x * height *4 );
          
        dst[dCol]     = src[sCol]; 
        dst[dCol + 1] = src[sCol + 1];
        dst[dCol + 2] = src[sCol + 2];   
        dst[dCol + 3] = 255;     
      }
    }
    
  // 180度回転
  }else if (option == 3){
    
    for (var y = 0; y < height; y++) {
      sRow = (y * width*4);
      dRow = ((height-y-1) * width*4);  
           
      for (var x = 0;x < width; x++) {
        sCol = sRow + (x * 4);
        dCol = dRow + ((width -x -1) * 4);
        dst[dCol]     = src[sCol]; 
        dst[dCol + 1] = src[sCol + 1];
        dst[dCol + 2] = src[sCol + 2];   
        dst[dCol + 3] = 255;     
      }
    }
  }      
}

// 画像を左右回転させる
function EffectMirror(source,destination){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;

  var sRow,sCol,dRow,dCol; 
  for (var y = 0; y < height; y++) {
    sRow = dRow= (y * width*4);
         
    for (var x = 0;x < width; x++) {
      sCol = sRow + (x * 4);
      dCol = dRow + ((width -x -1) * 4);
      dst[dCol]     = src[sCol]; 
      dst[dCol + 1] = src[sCol + 1];
      dst[dCol + 2] = src[sCol + 2];   
      dst[dCol + 3] = 255;     
    }
  }     
}

// 画像を上下反転させる
function EffectFlip(source,destination){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;
  
  var sRow,sCol,dRow,dCol; 
  for (var y = 0; y < height; y++) {
    sRow = (y * width*4);
    dRow = ((height-y-1) * width*4);
        
    for (var x = 0;x < width; x++) {
      sCol = sRow + (x * 4);
      dCol = dRow + (x * 4);
      dst[dCol]     = src[sCol]; 
      dst[dCol + 1] = src[sCol + 1];
      dst[dCol + 2] = src[sCol + 2];   
      dst[dCol + 3] = 255;     
    }
  }     
}

// 明るさ補正
// rgb : -255 - 255(標準:0)
function EffectLight(source,light){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;  
 
  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);
      raw[sCol]   = set255(raw[sCol]   + light);
      raw[sCol+1] = set255(raw[sCol+1] + light);
      raw[sCol+2] = set255(raw[sCol+2] + light);        
      raw[sCol+3] = 255;           
    }
  }  
}

// コントラスト補正
// contrast : -255 - 255(標準:0)
function EffectContrast(source,contrast){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var LUT = new Array();  
  for(var i=0;i<256;i++){
    LUT[i] =  set255r((1+(contrast/255))*(i-128)+128);
  }
 
  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);
      raw[sCol]   = LUT[raw[sCol]];
      raw[sCol+1] = LUT[raw[sCol+1]];
      raw[sCol+2] = LUT[raw[sCol+2]]; 
      raw[sCol+3] = 255;            
    }
  }  
}

// ガンマ補正
// gamma : 0.01 - 3.0(標準:1)
function EffectGamma(source,gamma){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var LUT = new Array();  
  for(var i=0;i<256;i++){
    LUT[i] = set255r(Math.pow(i / 255.0, 1.0 / gamma) * 255);
  }
  
  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);
      raw[sCol]   = LUT[raw[sCol]];
      raw[sCol+1] = LUT[raw[sCol+1]];
      raw[sCol+2] = LUT[raw[sCol+2]];  
      raw[sCol+3] = 255;           
    }
  }  
}

// RGB調整
// r,g,b: -255～255(標準:0)
function EffectRGBColor(source,r,g,b){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);     
      
      raw[sCol]   = set255(raw[sCol]   + r);
      raw[sCol+1] = set255(raw[sCol+1] + g); 
      raw[sCol+2] = set255(raw[sCol+2] + b); 
      raw[sCol+3] = 255;               
    }   
  }  
}

// RGB交換
// option: 1:GRB 2:BGR 3:RBG 4:BRG 5:GBR
function EffectRGBSwap(source,option){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol,r,g,b;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);     
      
      // 一時退避
      r = raw[sCol];
      g = raw[sCol+1];
      b = raw[sCol+2];
      
      switch (option){
        case 1: // GRB
              raw[sCol]   = g;
              raw[sCol+1] = r; 
              raw[sCol+2] = b; 
              break; 
        case 2: // BGR 
              raw[sCol]   = b;
              raw[sCol+1] = g; 
              raw[sCol+2] = r; 
              break; 
        case 3: // RBG
              raw[sCol]   = r;
              raw[sCol+1] = b; 
              raw[sCol+2] = g; 
              break; 
        case 4: // BRG
              raw[sCol]   = b;
              raw[sCol+1] = r; 
              raw[sCol+2] = g; 
              break; 
        case 5: // GBR
              raw[sCol]   = g;
              raw[sCol+1] = b; 
              raw[sCol+2] = r; 
              break;                                                               
      } 
      raw[sCol+3] = 255;     
    }   
  }  
}

// ノーマライズ(ヒストグラムの引き伸ばし)
function EffectNormalize(source){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;

  var r_min,g_min,b_min;      
  var r_max,g_max,b_max;      
  
  r_min = g_min = b_min = 255;
  r_max = g_max = b_max = 0;

  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);
      
      // 最小値
      if(raw[sCol]   < r_min) r_min = raw[sCol];
      if(raw[sCol+1] < g_min) g_min = raw[sCol+1];
      if(raw[sCol+2] < b_min) b_min = raw[sCol+2];

      // 最大値
      if(raw[sCol]   > r_max) r_max = raw[sCol];
      if(raw[sCol+1] > g_max) g_max = raw[sCol+1];
      if(raw[sCol+2] > b_max) b_max = raw[sCol+2];      
    }                       
  }
  
  // 比率を求める
  var r_ratio =  255 / (r_max - r_min);
  var g_ratio =  255 / (g_max - g_min);
  var b_ratio =  255 / (b_max - b_min);

  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);      
      raw[sCol]   = set255r(r_ratio * Math.max((raw[sCol]   - r_min),0));
      raw[sCol+1] = set255r(g_ratio * Math.max((raw[sCol+1] - g_min),0));
      raw[sCol+2] = set255r(b_ratio * Math.max((raw[sCol+2] - b_min),0)); 
      raw[sCol+3] =  255;     
    }       
  }    
}

// イコライズ(ヒストグラムの平均化)
function EffectEqualize(source){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  // 一定値を求める
  var n = Math.floor(width * height / 256) +1;
  
  // 色の平均個数
  var RGB_count = [];
  for (var i = 0; i < 256; i++) {
    RGB_count[i] =0;
  }
  
  // 全ての濃度をヒストグラムにする
  var sRow,sCol;  
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);  
      RGB_count[Math.floor((raw[sCol]   + 
                            raw[sCol+1] + 
                            raw[sCol+2])/3)
               ]++
    }
  }
  
  // 平均化のための変換テーブルの作成
  var LUT = [];
  for (var i = 0; i < 256; i++) {
    LUT[i] = 0;
  }
  
  var HistTotal = 0,index=0;
  for (var i = 0; i < 256; i++) {
    HistTotal = HistTotal + RGB_count[i];
    index = index + Math.floor(HistTotal / n);
    HistTotal = (HistTotal % n);
    LUT[i] = index;
  }
  
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);      
      raw[sCol]   = LUT[raw[sCol]];
      raw[sCol+1] = LUT[raw[sCol+1]];
      raw[sCol+2] = LUT[raw[sCol+2]]; 
      raw[sCol+3] = 255;     
    }   
  }  
}

// トーンカーブ
function EffectToneCurve(source,LUT){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);      
      raw[sCol]   = LUT[raw[sCol]];
      raw[sCol+1] = LUT[raw[sCol+1]];
      raw[sCol+2] = LUT[raw[sCol+2]];    
      raw[sCol+3] = 255;          
    }   
  }  
}

// 二階調化
// value:0-255(標準:127)
function EffectMono(source,value){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);     
      
      if(raw[sCol]   <= value && 
         raw[sCol+1] <= value &&
         raw[sCol+2] <= value){

        raw[sCol] = raw[sCol+1] = raw[sCol+2] = 0;
      }else{
        raw[sCol] = raw[sCol+1] = raw[sCol+2] = 255;
      } 
      raw[sCol+3] = 255;               
    }   
  }  
}

// 濃度抽出(メディアン)
// option: 1:最大濃度 2: 中間濃度 3: 最小濃度
function EffectMedian(source,destination,option){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;
  
  var r =[0,0,0,0,0,0,0,0,0];
  var g =[0,0,0,0,0,0,0,0,0];
  var b =[0,0,0,0,0,0,0,0,0];
  var index,ty,tx;
  
  // オプション
  var N;        
  if(option == 1){
    N = 8;
  }else if(option == 2){
    N = 4;
  }else {
    N = 0;
  }      
           
  var sRow,sCol,dRow,dCol; 
  for (var y = 0; y < height; y++) {
    dRow= (y * width * 4);
         
    for (var x = 0;x < width; x++) {
      dCol = dRow + (x * 4);
      
      index=0;
      for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1;dx <= 1; dx++) {
          
          // Y軸
          ty = y + dy;
          if (ty >= (height-1)){
            ty = height-1;
          }else if (ty < 0){
            ty =0;            
          }          
          
          // X軸
          tx = x + dx;
          if (tx >= (width-1)){
            tx = width-1;
          }else if (tx < 0){
            tx =0;            
          }      
          
          sRow = (ty * width * 4);
          sCol = sRow + (tx * 4);
          r[index] = src[sCol];   
          g[index] = src[sCol+1]; 
          b[index] = src[sCol+2];          
          index++;
        }
      }
      
      // 昇順ソート
      r.sort(ASC_SORT);g.sort(ASC_SORT);b.sort(ASC_SORT);
      
      dst[dCol]     = r[N]; 
      dst[dCol + 1] = g[N];
      dst[dCol + 2] = b[N];   
      dst[dCol + 3] = 255;     
    }
  }     
}

// ノイズ
// 度数 value:0-255(標準:30)
function EffectNoise(source,value){
  var height = source.height;
  var width  = source.width;
  var raw    = source.data;
  
  var sRow,sCol,rnd;
  for (var y = 0; y < height; y++) {
    sRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      sCol = sRow + (x * 4);     
      
      // ランダム値の発生
      rnd= Random(value,-(value >> 1));
      
      raw[sCol]   = set255(raw[sCol]   + rnd);
      raw[sCol+1] = set255(raw[sCol+1] + rnd); 
      raw[sCol+2] = set255(raw[sCol+2] + rnd); 
      raw[sCol+3] = 255;               
    }   
  }  
}

// 拡散
// 度数 value:0-30(標準:7)
function EffectDiffusion(source,destination,value){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;
  
  var sRow,sCol,dRow,dCol,dy,dx,rnd;
  for (var y = 0; y < height; y++) {
    dRow= (y * width * 4);
    for (var x = 0; x < width; x++) {
      dCol = dRow + (x * 4);           

      // 取得する座標
      dy = Math.abs((y + Random(value,-value))); 
      dx = Math.abs((x + Random(value,-value)));

      // 範囲外はデフォルトの値を使用する
      if((dy >= height-1) || (dx >= width-1)){
        sRow = (y * width * 4);
        sCol = sRow + (x * 4);  
      }else{
         sRow = (dy * width * 4);
         sCol = sRow + (dx *4);
      }
      
      dst[dCol]   = src[sCol];
      dst[dCol+1] = src[sCol+1]; 
      dst[dCol+2] = src[sCol+2]; 
      dst[dCol+3] = 255;               
    }   
  }  
}

// モザイク
// ブロック幅 value: 1-50(標準:5)
function EffectMosaic(source,destination,value){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;
  
  var lst_avg =[];   
  var sRow,sCol,dRow,dCol,r,g,b;
  
  // ブロック毎の平均データを取得
  for (var y = 0; y < height; y += value) {
    for (var x = 0; x < width; x += value) {

      // ブロックのY座標   
      r = g = b = 0; 
      for(var sy = 0; sy < value; sy++){        

        if((y+sy) > (height-1)){
          sRow = (height-1) * width * 4;
        }else{
          sRow = (y+sy) * width * 4;
        }
           
        // ブロックのX座標 
        for(var sx = 0; sx < value; sx++){
          
          if((x+sx) > (width-1)){
            sCol = sRow + (width-1) * 4;
          }else{
            sCol = sRow + (x+sx) * 4;
          }
          
          r += src[sCol];
          g += src[sCol+1];
          b += src[sCol+2];
        }       
      }
      
      // ブロック毎の平均  
      lst_avg[lst_avg.length] = {'r':set255r(r/value/value),
                                 'g':set255r(g/value/value),
                                 'b':set255r(b/value/value),
                                };
    }
  }
  
  // 平均データの転写
  var count = 0;
  for (var y = 0; y < height; y += value) {
    for (var x = 0; x < width; x += value) {

      // ブロックのY座標   
      r = g = b = 0; 
      for(var dy = 0; dy < value; dy++){   
             
        if((y+dy) > (height-1)){
          dRow = (height-1) * width * 4;
        }else{
          dRow = (y+dy) * width * 4;
        }
           
        // ブロックのX座標 
        for(var dx = 0; dx < value; dx++){
          
          if((x+dx) > (width-1)){
            dCol = dRow + (width-1) * 4;
          }else{
            dCol = dRow + (x+dx) * 4;
          }
          
          dst[dCol]    = lst_avg[count].r;
          dst[dCol+1]  = lst_avg[count].g;
          dst[dCol+2]  = lst_avg[count].b;
          dst[dCol+3]  = 255;
        }       
      }
      count++;
    }
  }
}

// 手ぶれ
// 方向 option: 1-4,6-9 範囲 value:1-50(標準:18) 
// ※optionの5はない
function EffectHandShake(source,destination,option,value){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;
  
  var ix,iy;
  switch(option){
    case 1 : ix = (-value); iy = value;    break; // 右上
    case 2 : ix = 0;        iy = value;    break; // 上
    case 3 : ix = value;    iy = value;    break; // 左上
    case 4 : ix = (-value); iy = 0;        break; // 右
    case 6 : ix = value;    iy = 0;        break; // 左
    case 7 : ix = (-value); iy = (-value); break; // 右下
    case 8 : ix = 0;        iy = (-value); break; // 下
    case 9 : ix = value;    iy = (-value); break; // 左下
  }   

  var sRow,sCol,dRow,dCol;
  for (var y = 0; y < height; y++) {
    dRow = (y * width * 4);
    for (var x = 0; x < width; x++) {
      dCol = dRow + (x * 4);
      
      // 手ぶれの座標計算
      var sx = x + ix ;
      var sy = y + iy ;
      
      if(sx < 0) sx =0;
      if(sx > (width-1))  sx = width-1;
      if(sy < 0) sy =0;
      if(sy > (height-1)) sy = height-1;

      sCol = (sy * width * 4) + (sx * 4);
     
      dst[dCol]     = set255r(((src[dCol]     * 2) + src[sCol]) /3);
      dst[dCol + 1] = set255r(((src[dCol + 1] * 2) + src[sCol + 1]) /3);
      dst[dCol + 2] = set255r(((src[dCol + 2] * 2) + src[sCol + 2]) /3);
      dst[dCol + 3] = 255;       
    }
  }
}

// 鉛筆画調
// 階調度 power:2,4,8,16,256(標準)  鉛筆の芯:option : 1:細い 2:中間(標準) 3:太い
function EffectPen(source,destination,power,bold){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;

  // 階調化(色を削る)
  var value = Math.floor(256 / power);  

  var sRow,sCol,dRow,dCol;
  for (var y = 0; y < height; y++) {
    dRow = (y * width * 4);
    for (var x = 0; x < width; x++) {
      dCol = dRow + (x * 4);
      
      src[dCol]   = set255r(Math.floor(src[dCol]   / value) * value);
      src[dCol+1] = set255r(Math.floor(src[dCol+1] / value) * value);
      src[dCol+2] = set255r(Math.floor(src[dCol+2] / value) * value);
      src[dCol+3] = 255;
    }
  } 
  
  // グレースケール
  var YIQ;
  for (var y = 0; y < height; y++) {
    dRow = (y * width * 4);
    for (var x = 0; x < width; x++) {
      dCol = dRow + (x * 4);
      YIQ = set255r(src[dCol]   * 0.299 +
                    src[dCol+1] * 0.587 +
                    src[dCol+2] * 0.114);
                              
      src[dCol]   = YIQ;
      src[dCol+1] = YIQ;
      src[dCol+2] = YIQ;
    }
  }
  
  // 鉛筆の芯(細い)
  var r,g,b,index,ty,tx ;
  if(bold == 1){    
    
    for (var y = 0; y < height; y++) {
      dRow= (y * width * 4);
           
      for (var x = 0;x < width; x++) {
        dCol = dRow + (x * 4);
        
        r=0; g=0; b=0; index=0;
        for (var dy = -1; dy <= 1; dy++) {
          for (var dx = -1;dx <= 1; dx++) {
            
            // Y軸
            ty = y + dy;
            if (ty >= (height-1)){
              ty = height-1;
            }else if (ty < 0){
              ty =0;            
            }          
            
            // X軸
            tx = x + dx;
            if (tx >= (width-1)){
              tx = width-1;
            }else if (tx < 0){
              tx =0;            
            }      
            
            sRow = (ty * width * 4);
            sCol = sRow + (tx * 4);
            r =  r + src[sCol];
            g =  g + src[sCol+1];
            b =  b + src[sCol+2];          
            index++;
          }
        }
        dst[dCol]     = 255 - set255(r - src[dCol]   * 9); 
        dst[dCol + 1] = 255 - set255(g - src[dCol+1] * 9); 
        dst[dCol + 2] = 255 - set255(b - src[dCol+2] * 9);    
        dst[dCol + 3] = 255;     
      }
    }     
    
  // 鉛筆の芯(中間)   
  }else if(bold == 2){
    
    for (var y = 0; y < height; y++) {
      dRow= (y * width * 4);
           
      for (var x = 0;x < width; x++) {
        dCol = dRow + (x * 4);
        
        r=0; g=0; b=0; index=0;
        for (var dy = -1; dy <= 1; dy++) {
          for (var dx = -1;dx <= 1; dx++) {
            
            //-------------
            // 0 - 1 - 0
            //-------------
            // 1 - 1 - 1
            //-------------
            // 0 - 1 - 0

            if (!( ((dy == -1) && (dx ==  0)) ||
                   ((dy ==  0) && (dx == -1)) ||
                   ((dy ==  0) && (dx ==  0)) ||                  
                   ((dy ==  0) && (dx ==  1)) ||
                   ((dy ==  1) && (dx ==  0))
                  ) ){
               continue;
            }
                       
            // Y軸
            ty = y + dy;
            if (ty >= (height-1)){
              ty = height-1;
            }else if (ty < 0){
              ty =0;            
            }          
            
            // X軸
            tx = x + dx;
            if (tx >= (width-1)){
              tx = width-1;
            }else if (tx < 0){
              tx =0;            
            }      
            
            sRow = (ty * width * 4);
            sCol = sRow + (tx * 4);
            r =  r + src[sCol];
            g =  g + src[sCol+1];
            b =  b + src[sCol+2];          
            index++;
          }
        }
        dst[dCol]     = 255 - set255(Math.abs(r - src[dCol]   * 5)); 
        dst[dCol + 1] = 255 - set255(Math.abs(g - src[dCol+1] * 5)); 
        dst[dCol + 2] = 255 - set255(Math.abs(b - src[dCol+2] * 5));    
        dst[dCol + 3] = 255;     
      }
    }     
  // 鉛筆の芯(太い)  
  }else if(bold == 3){
    
    for (var y = 0; y < height; y++) {
      dRow= (y * width * 4);
           
      for (var x = 0;x < width; x++) {
        dCol = dRow + (x * 4);
        
        r=0; g=0; b=0; index=0;
        for (var dy = -1; dy <= 1; dy++) {
          for (var dx = -1;dx <= 1; dx++) {      
                       
            // Y軸
            ty = y + dy;
            if (ty >= (height-1)){
              ty = height-1;
            }else if (ty < 0){
              ty =0;            
            }          
            
            // X軸
            tx = x + dx;
            if (tx >= (width-1)){
              tx = width-1;
            }else if (tx < 0){
              tx =0;            
            }      
            
            sRow = (ty * width * 4);
            sCol = sRow + (tx * 4);
            r =  r + src[sCol];
            g =  g + src[sCol+1];
            b =  b + src[sCol+2];          
            index++;
          }
        }
        dst[dCol]     = 255 - set255(Math.abs(r - src[dCol]   * 9)); 
        dst[dCol + 1] = 255 - set255(Math.abs(g - src[dCol+1] * 9)); 
        dst[dCol + 2] = 255 - set255(Math.abs(b - src[dCol+2] * 9));    
        dst[dCol + 3] = 255;     
      }
    }     
  } 
}

// カスタムフィルタ 3x3
// matrix   : フィルタのマスクビット
// divisor  : 除数(1-255)
// addition : 加算(0-255)
function EffectCustom3x3(source,destination,matrix,divisor,addition){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;

  var sRow,sCol,dRow,dCol; 
  var r,g,b,index,ty,tx;
  
  for (var y = 0; y < height; y++) {
    dRow= (y * width * 4);
         
    for (var x = 0;x < width; x++) {
      dCol = dRow + (x * 4);
      
      r=0; g=0; b=0; index=0;
      for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1;dx <= 1; dx++) {
          
          // Y軸
          ty = y + dy;
          if (ty >= (height-1)){
            ty = height-1;
          }else if (ty < 0){
            ty =0;            
          }          
          
          // X軸
          tx = x + dx;
          if (tx >= (width-1)){
            tx = width-1;
          }else if (tx < 0){
            tx =0;            
          }      
          
          sRow = (ty * width * 4);
          sCol = sRow + (tx * 4);
          r =  r + (src[sCol]   * matrix[index]);
          g =  g + (src[sCol+1] * matrix[index]);
          b =  b + (src[sCol+2] * matrix[index]);          
          index++;
        }
      }
      dst[dCol]     = set255(Math.floor(r/divisor) + addition); 
      dst[dCol + 1] = set255(Math.floor(g/divisor) + addition);
      dst[dCol + 2] = set255(Math.floor(b/divisor) + addition);   
      dst[dCol + 3] = 255;     
    }
  }     
}

// カスタムフィルタ 5x5
// matrix   : フィルタのマスクビット
// divisor  : 除数(1-255)
// addition : 加算(0-255)
function EffectCustom5x5(source,destination,matrix,divisor,addition){
  var height = source.height;
  var width  = source.width;
  var src    = source.data;
  var dst    = destination.data;

  var sRow,sCol,dRow,dCol; 
  var r,g,b,index,ty,tx;
  
  for (var y = 0; y < height; y++) {
    dRow= (y * width * 4);
         
    for (var x = 0;x < width; x++) {
      dCol = dRow + (x * 4);
      
      r=0; g=0; b=0; index=0;
      for (var dy = -2; dy <= 2; dy++) {
        for (var dx = -2;dx <= 2; dx++) {
          
          // Y軸
          ty = y + dy;
          if (ty >= (height-1)){
            ty = height-1;
          }else if (ty < 0){
            ty =0;            
          }          
          
          // X軸
          tx = x + dx;
          if (tx >= (width-1)){
            tx = width-1;
          }else if (tx < 0){
            tx =0;            
          }      
          
          sRow = (ty * width * 4);
          sCol = sRow + (tx * 4);
          r =  r + (src[sCol]   * matrix[index]);
          g =  g + (src[sCol+1] * matrix[index]);
          b =  b + (src[sCol+2] * matrix[index]);          
          index++;
        }
      }
      dst[dCol]     = set255(Math.floor(r/divisor) + addition); 
      dst[dCol + 1] = set255(Math.floor(g/divisor) + addition);
      dst[dCol + 2] = set255(Math.floor(b/divisor) + addition);   
      dst[dCol + 3] = 255;     
    }
  }     
}
