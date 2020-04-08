import React, {
  Component
} from 'react';
import {
  Document,
  Media,
  Packer,
  Paragraph,
  TextRun,
  Header,
  AlignmentType,
} from "docx";
import DoDSeal from '../images/DoD Seal.PNG'
import {
  saveAs
} from 'file-saver';
var LSGETATTN;
var LSGETFROM;
var LSGETSUBJECT;
var LSGETPARA;
var LSGETUNIT;
var LSGETDATE;
var LSGETDUTYTITLE;
var LSGETRANK;
var LSGETWRITERSNAME;
var LSGETBRANCH;
var LSGETNUMBEROFPARAGRAPHS;
var paragraphInfo = [];
const base64image = "iVBORw0KGgoAAAANSUhEUgAAAKEAAACiCAYAAAApxa0YAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAADbtSURBVHhe7d1JrK/Z9D5wQ0MzZoyKESbEAJEQRImmoo3oCdFEG0QfKpqqaCKa6JvoJkpEFyElmpQw0E0wKUaYGRqe3//zus/9r7vv3m/zbU5z6zzJyvdtdrP2Ws9aa7/v+Z5z7nVyiUucMS5JeIkzxyUJL3HmuCThJc4clyScwX//+9+Tn//855PccccdJ+95z3uuk9tuu+26ax/4wAdO7rzzzqnfH/7whyujXWKESxL+P/zmN785+dKXvnTy1re+dSLRBz/4wenzy1/+8lUSbsW//vWvq32NlzHf9ra3TZ8//vGPT/7+979faX3Pxj2OhLIbAshWyIB4stxf/vKXKy1OB8j56U9/epqfLh/72MfusVnzHkFCzpWJ3v3udy86OxnsM5/5zETSpz3taSePecxjJrnXve61Su53v/td7fPKV75yGue73/3ubEZNcNQsTJd7Am5YEspsMozy981vfvPkP//5z5U7/x/acDaiIMy9733vLqkOLQ94wAOm+VKWR7oJGPrTsdfmRsENRUKO4rCPfvSjE/Fklwp7MBlOdrvPfe7TJcicIM4u/dbIgx70oCkYZMye3giJtB54bjTcECSUNTiIo9oSlnuc3HN+Kw996ENP3vve906C0Poro86N/cQnPrHbb62kVC+RWaD0MuCPfvSjaR9prTdKdrzQJFTK7PNkvQpksbdaIh4iKHeyY0jxohe96ORb3/rWdOweGMt5slX6bxHk9hROkPA5z3nORDKk7LWvgpB0qsgaBdhFf8q+kCRUkl7/+tef3HXXXVeu/A9Iybk9R5JHPOIR191HgpCMIAjCOEZICCnTPsdrBXllLcSp/a0Bgdox7RnreUQ7gVFJp3SnVLdV4KLgQpFQFmHs+pTJCTLKyHHEA0fNJI5rOeTEHLueBxSEBPPl/i6Sues8JOPXIMh1RLMFGGVz2ZE9AnbwysfD2EUr0xeChCIc+WS6IBmgl5kQkpPa68iUTT8ny4yuy0i9PRoCpG17b4uEFO1+MiT0yqh33bqtg362Ab21atsGJbsgZNZ63nGuSciI9msMGsyRD6lkD07xQNG+clHKtHEvY7mm/PbKuP5Be2+LBC3RkRJaksvsYC25Rj+krO2qtGTU1gNMDdzzinNLQqVGmaqlxeuLXtnloGz4c027lljIZp+HXMgdcJTz2jaS+XukXysZo70umMC6co1uyWApxdmjjnSsInPWPaN983nfL547Eib71QiWuSrBIhymTMVpKcFzr1Hq/kv7EGRUcuPQlO5dJGSrmdlxxq5bB4ED1mTNSnGCabQ/bMXYMnzs4tO6k2HPG84VCdvsx3iMWZ1H2gynDSCuc9muOrZKLXFEhssGv82ySEAHQcCByUhbRRm276NXriEXtNktwWdNsUW7/rViPTWYkxVj3/OCc0PCNlIRo418565rV68jUqJeZpRh6ma/llIE7pV0Tq8kObQgUrIaQY42mOgZROc1JXhJrKsGtr1iAu884MxJyDgIkIcFEK09Y+ZVB0O2WSklL+RDxrSpJVh207ZHxLMUutobQn0ltLYEt9Lap2Z88M2h81Kez5SEiOcnHolSGWxu74WsKS/IVssUowfJIsqg4/pUKRsp1Usljh4ylfItGyEGyT5uBHqlrb4E8deQ3nwCLduKfcScSBdbRLJ1AboK0FSRs8KZkZCh66sXWaC+wkCS9pUG8pA86bX7u2QSmc65MeLUOdIhsMyJbKMyVcllfNma3H777VePzZ82vX2XayGndbQEibjern2rJMsJ9N77yejnU2D29D0tnAkJGaj+vLctv4zGeMhWDag0IYuMASK4lqu8d2NQEU96GQghjUGP9tVFSCZDEMT0GXKNCAaVqAhpXebwaQwBUbcdkGzUls99pNrHuLI6W9Q27GLutLNPbHU7LZw6CS02P/O1+PYpVpRyXHU0IiSTJfsl68lc6cvgyqXI7mWSlLtafhAmpEOWOZLtC042v7nMaV3V8XR3fdd9IEGu6F+JZ97W1qkUAb2y3TlNnCoJkSPRJwPV6GeQWp4YRNaLQTlLRHOS+9rmHkIiby+bcApnJ+MhIMMjHCed5VMi/elCD/rENuDY+ue2ET0RROCzXkeu0V7T3IEt0mkT8VRIyPEWevfdd0/nIr6WSVkLGRAtGQzJZD2f1SjapB/nIVfv1QpCJluC8emA3DX7nCekhNegQVR2WLNH1C59qn3ZkA8qMWvAEzYMbJVOk4inQkKGzVNlS0DHMTLD1JKhfMpwMVIyXwzofuuclnxKu+yZDHFIcOxrXvOaK2eHg3HpLWCSHefIaM3aBuxS76fkGjPXZNh6Ts6KiEcnoT3giID2Pq6RNjIjDJ+SpA3D9H4sZ9yQjxNlE+TL3FuhFLb4zne+c+Xof+DcD3/4w9N8wb///e+Tn/3sZ1fO/gdZ7bWvfe2Vs20QPII4QYSMKkBbpm11Qt56PdkREtBpD9ZQx2qJeBq/TnBUEvpdj0RyS0DRy5i577MX5YjHYPVaNZo+yBYiIJ+skHK2C+hadQ+QoSIkb7cLyTwBfbzK2QchY/aw5m0znqBGOnaOXYK6ZalE04Z+IyK6//vf//7K2XFwNBKKokRvS0ARycGOXXcftG8jnDASx7bZUkYM2RABqTPWCD1yyh4p9UAP+n3qU5+ajs3/4he/+OQlL3nJyROe8ISTd7zjHRMh/NQBPv7xj0/nr371q0+e9axnnbziFa+YSCwgZEUZuhICvvjFL05Zs0IgVT16MFb2wmDd1S7sh4j0Jm3lqATTzjWEZd+aBGo761+y6z44CgktPA5i1PaVg8UyUM4RMcbXtyUig1QDOUYc4IyaIZZgD2fuCtlLpjImZ3zoQx+aCPGPf/xjMj6dXDdPymH7cOO+/kQfjtP2F7/4xXT/+9///kRK8r3vfe9qOax4y1veMrVbA6Q2FpiHjarNetJmuHrP9iOJIWKdgeP46NA4OAk5J8bhyLoPqYJIlZzKc0oqR9a2VbymSRbgeHOl3xqEKAxuHMcvfelLT17+8pdPjnFeIZN97Wtfm47Nlbn9uDH47W9/e/K5z31uOg756PTGN75xuhboawyZ87nPfe60Xzaftua2nnYLMAfjIUcCUJaswRoR1Ep3QEdtfdJHH+P0iFx9WUl5SByUhIzPsEF90rVQi5aFUgZaUTZCKM5of46sH5invnOcw+9+97srR/9DyqJMzemyHCfmOsfmGEJU4DhBRkfOsZb87FuWhHxCPVZ6P/KRj0x99SPm+dvf/jaVfUR2rZY9bd1fgnVEZ/1bu9XAiu0Rjv1C2rZPFesGY/sdlkPjoCQUKSERB2QRFspQWQxI/3WhEdeN0RI4fTkKmTPPEvRjbOThqPqAgBg5R8aQWjsGt/fjQCRBxpBH21tvvXU6TvuU1xDPvLKoezItfUMGbZyTGrQI94lPfGKyFWLXzLsE66NDsnBrX2PRO+fuh4A9qf1l0mw/rLn68RA4GAltxPMyui6WcET2ecl2o2yofNcSbtMdcjAkB41gnhgr+NWvfnXy7Gc/e3qoiHODmsHohNzwrne962oZ0kap9SoGMRHp29/+9nXk0KaOh3hxluvGDglDWGNkzoD+so0HnJe97GXX6AtI2mb3wBokgtjL2NW2iNU+3PUkW6Nanm2dogvbtHbeBwchoXKWLyRwVI0wCltQfZ2ADByBbO1DSxXGMF5r3BGStURrHO9BJNmQ0z10+HSNHhwawmlvLs7qwb2WNC1Cwhb0qUQ2lrb0EpDOBVGyK538tQVP3CFzMm5LzBbGTx/H9UHP2gjbm7e+tSD8lPHpWsu06hTI4HQ+BPYmIUXqJr1VukYMIiFor8RYeDUIArpGGJ5BlqAN43v6ZCTlNgQLOTj5r3/963QeQngoUQq1XXLwiGTB0uYdkazfp7FUjehJF3A/82iHqLIzfZfmD9ghazdHJSLySRxtAjBXIED1Yfs2qQAdVb9DYG8SMkoc57guKlKzB1JaGEMwDmMgci3BlYB1n9lDJQ0nVcN89rOfvUp4TuFM8oY3vKEbCCHlHHbNhIG19yA43vzmN0/H1hz92sBo7TFnm/rA1RKxCpIlAwMdc08fhKznSSyqnzn2xV4kpEDSvuPRIok0H4NpO9oUbyGge8k8nFUjGTiSQeNEBPHuL69cetiHZEskpu/c+LIdnbMmAdPO574x2NB89ohzMMaIiPbn9n0hPDsZ2/ySQh4OEdS19FPtAlVwzkdrsDMJq0Edz+3tIpQPIRhQNkS63M/mdw0Bg1//+tcnN99888mb3vSmyWFvf/vbp/4M7un2Jz/5yckLX/jCkz/96U9Xs+EcljLZHIkQw7wjmF+bOVg3Utjb2lLIQtnueCCiHxHU1rUGLRFjb4SMPj7z0GJ+xJMobJEE+H3ve99rfBU7aFu/Ib8LdiahiRNBNUqWxKJCBFkj1y0YMRFvRMCvfvWr15BIe9FqD5iM7Jrj7F1A+YiuSyRj/DmizJFwieTWNQc6hizGScDSH3mq7o4RVdBVW1m3gGthvNjEHLE74hk/GVIGtMbczz4d6Y2R67UsW3eOd8FOJGSsLKgqtlZkvFoaakRyVIzfwlz2fIzkHRwd4jSfCAjvf//7ryFhxRJRODRj9jB3T1BFhx6WAsC6RtnfvOkvO7IXP3z961+f+vnxoPt+SjMag80TrHXfVzNc+wrHufmC2g9hg6W1zWEnEnqPlYW2T8NKrH0GBUOyVpCw7gmzj0LAOSeCtubO16XqHiwZ1JcNRkSGJYPN3Z8j2lw/xK/ObFEDu4fPf/7zU8Y3Tm3n2Jq9D10aA+ifh5D6MNiTmhDMgeyuVaJmTX5lIwTfis0k9LWeTOazKk05hqhwbtEW4P0UgtZF5GmR8ebKYMAZlWA28zGEudZEJL3jiB44ql1HMFeu5+a2/rnAmMuCgf5IkGN96nccP/nJT173zZwe6CmQjFFfi8UvEkutFtabPb/EQofaJ3obd2kNPWwmYYxgsrqAiOjiKKm/5yxlJW3zlKV9zWgV9jfJPD3y2Isg4Qte8ILpxbM55zJOIBhGMN9IH/ONIn6OhHP31mQwYHt299LbS3gPXW2wGCf2+uUvfzl9tjCG4PfJXqlYCFX3dsaWOFS33PfpvH49LGtD3LntygibSMj4+aZtJVMrjBWCilbEzIvrug9krKXsxVAM4R2arzoxsn2Pfr4QgJQtMbWZ2/eBtYzIBPTuQfYYESYB2kKfOeesyYL6twSxboRgR2thR59PfepTpzFHgQT6R9+QjLA16JstU/wU4pm37g350n1IoGzBJhKGLCapJdXGNnvBKMVolK4/rqvREwOtUdqrCT/7TWbVnpFHRAHjcv4c5rIh/Ud6jeYdBZPMPAoKzlvKgpw+yu4hYCUc3f24b2n9xtXXOuvDiblyLHlYb5KH6tV7HZdt1T//+c/Nr2xWk1B57WVBWa46i8KuUxRp0q6KPsBwNbqhdTwn5UdWxqYHcNz73ve+6bgH44wyUxAn9OAe6WErCecyvbFGZAfrH80XeBCrmYjd2ZafKnrzaKOvIAnREDIJoyabOanZcG69Pawm4SgLIgNSJfMgS+7JNCKpRhllk95bI4E9oG+guIcE+dQHzMfA9PCQMgcE781RsUSQHnpjzpXc0RxsMJcFrTF7tzmoFGmboGYj4/s1AsfkGc94xnSvQr/oV8uyY+PxbX0D0gr/5jjZEKFHwd3DKhJamH9ACG2qruVW9tM254QylMu5xYGFj4yrD9J50OBcr2PySgbcX8oOAX1HGQ3mDDYiT49s1t0rmbLSaPylLOh+gm8ObMTGyUTG9PACgtp9uo3GYh8VRr+U2vzwQL9KtCqSTPW3PlnPWv/AKhLW94I1q2WfI8o8iFDC5LlPRFKOZVDjWPTIMUFbas3F+R5QGJVzE3lLWHLmiGzW1evXM7A19ciubWxXYdy5LMg+c8ETGIcd2ERGRL5kweCPf/zjlBHnkKRg3uq/VlQy5KN71lV9nACl+9rf0lskoYlidANnMhOHhIH79eGjFcaBkdODtkz9+c9/nvrQozpGFHJAz8kV7s+1G2VDju0RpUdCGYM+LUZr9RQ60sc4vTla0Ls+2NGXjfX15iBwf2l/XG3eJo58Gpcoz7Ij6Je9JJGMgrW/CrBIQl/XSTaopTeP7yYNuQIObZ+MZVCw0Ja84NstefrND+599d67sFFGAtc5lAPmoN2cY0dk6fWhTzufDNBec94r3cnqPSRgliAY54iV9ZiHzWXJbBfaX+IPrAup6Be/8SF/mqs+C8SHdM21SB4ezT0KtIpFEsYJDFoZ3woF20mrghayZGBG8s2Qd77znVfLCQP67bQRCYFuxp1rAxwXR7Rg1F42tP7WkIzcZr0eiUfBM5cF84A3B3qOSBzQh54JbOt75jOfOdmpl7GBTvF39oF8Tt/4kcSHlaxVEBf4sE1QPcySkAHzQGLRvQlbkSG1rWm6ZsGQqwf3fMuZIaqRPdUtEYwBOTAROoKxR07oEYkTE9mBOeq2AHp9e9f0Tdlr4XpIM4I2axzrq22Zh10RJxltDvGR9bW+JXwaH9YHFuOmOmqTQOrZoMUsCX1jJYPVx3SOHD0xRfLimiT7LBnAuPntN0RhOE6ZI24Lc7QEaWHcXiZCkFE2rKBPS4S1JBw5xTqXyKVvGxAjxGaCmf7Wy6ZJECNoFx3rQ2ikzYIqYAheM2bWUr/yN8IsCUMaWSiDU4yT7fnaN+d1QxuhpIVRss1SX/nKVyajGs+rBFFYMyAgMD22ENEYPTIFKd89rCVOfWUE7V9OsKY2GEYkt7YROYH96Nvabw7m1qdmfbY0F4IYSxu/utp+6YG9zal99WXNgsZGbp/ZK9Y9I36A9q1PWwxJSPmw2WQZHNspY8L2Cwyyo4iuERQi94yMDBT08PGDH/xgWjjnamtuWdEvIGlHh6XFVOgf/XugZ8pVRY8oo1+xnIM+1lMxItrcHtF195e2IwGnI0bW8MMf/nCaF6H8bg0IeATUpmdTY7CNuSuxjAtsVx86e1JLcv3d6h6GJKRcWF9JVVOuNsiKIGljYVVBxtMmJbkFRRN5FdozRBYCxmEIRlgDWXaOuEjaG2sX0q1Bb9zYsAdrt62JH5ZgrJTeIP5ps6h197JykIBh7/iy+nmN1CRW/dhiSMIowQAZVObj2PrkZJHKcJTzE5FsUJOSW8O0sPesJcEP3+cMj6BrSzTjJ4J78HsocwY6Jn76058OiSB4Bfwa3WQ1bUdkBm2+8IUvXDk7mV5qz9mPn9nOmPH/SPjC+PrUZwcBBMbI76X30CUhwiAOYHOdLGAck2qX+6RGTiJhVIYgc1mESDbuXPYKtNNvTds4dC4QzhM4f42+SMTeoypTYSyVxdbHNsd72fh4hNg2CUbSQSzzpSL6BDpLOnyeEi4ZBfV301t0SYgQKVO1tFLKJG0EWSDFZME8FWdPgKi9kicLuIegflkn5cIcztdClK0p0XTxRdDzTkRfRJ0L2gCBiHWtAfvmr1OwAT96b4iM2f+1iB7miU9l7hCQZK+KgM49rFbOxK+bSWjSKFUfPlJmibSLMO2GOVGgRMOcQRHHffPVUvK85z1v1dfUK7aU6IsMJEKCudLbAwLWJ3hk8sCAgCObmYvwcfweQpKa6eJ3JKyv55JNvW8ezdMlYYhTJ58TE1OOwrnmHNZENSCRtu3DyBboZ94s/EbCltI7AuKyMVlL4vgvr+NqFsxPRtjduUyJAwieNp4fQEYc7X+7JEzqrINFKCPLkfr4Tup7QpMuPYH1wNiIiEy7Gnxtid4VxkV0Bt+akXYBW5BdgjP2RKatvoA8B2SvrzJaO1/XLZR7SnLlAKnZMoRucR0JGTU/qsvEBMstpkLJds293sQm3TWrAV0Y3zj2Llvh1yAPAdHPuBxCl6c//ekTAXNdYNq8t/Y5BJDIH3DaCr8eynZ02scHCKYi1oSEbNmG9fzfSsg6el94HQlNlk7ZbJKUOMZvM4CMVSdNCq5P04H9ApJqk+i0SXbOodXZVfwsNNlnSYynj7kyZuYjxskal8DI9KnjP+xhD5sMrxKYA5BFeTL+LhDQbKH/nC3oEz16DxOAIL4ps6YSZCwPiYLKuhwH7MS/KblrpXInFW30cHIdCS00i8uDCMU4NucRqdkTsfbZM5AQ1lgtGFUbWdbiRavj2p/xXSPGj9DD4uo1/WNIx8ZPZMaROXePgfXj6Ic85CHTuuaAZB7CMhbJwxoSmjdAEDbamnn0u//97z/NhYjIYBxz0Rm5Zdq6blJ1qpJXKvTs3a+2jo35jE3MK6Aq4ses22eOCfsal/7GYuOamKwBrDMZtKJLQqgPJZxQFW+FkeqGVQTKlAzagoPMUfu3Yi6LsrgsABjKtSw2GUOfEIUuFotcrmsH2jrXF3HoQYyv74g4dEVuc1fDG691ljW711t3D4I3JV1fOtAfMegl4EIo2feWW265SpqaEavunM9+sZs5tDXuk570pGv8GKLnGtvWLBhYPxgj7azd3KNsjAOZh61AVu3ZZkhCE2QQhqIIo/TISKlKQoqZrMf6gGG0tbCQlgGQhLOdu+4+RzDWTTfdNDkgjnGNngzC+O65Rh8LJ/RK5GqbiDeXfnTk2Ac+8IHXkaoHa9O+5yz3zGPOJSAO8tcgq0gQZZ3Gpl8CQj/Xa2BUoUNsRawdCfjPvMZxjZ9cGxEQzAf6ZPzWt86Npw376JO2xgdrzlgV15EwX8muRuh1RJA43qTZA2RCJFsCwqUPgzKs8Vz3p8joYGHGQhxtlEDt262Be/TQF3GRynh0jG4+GdqYKRfGMabPhz/84cPIrhAg9OzBHIn8EfRXfrMVoA/9Iwky41i7MV1HGGuirzXSgWgXO7SCcNr41M/Y7FTncX0ue7snANgu4yKbMfR1Tk9Ezn1+yD3Xg95X/q8hIQeEcLVkMlYIMXJSJowDesRtYSxGFc36MxYDxTghpwUZz0J9uua+T22ip8Ums2Z8xjKe69qkBBkTEa2JZAPu+hKMb4wezMfhc2SmT3W6eYk+soWxieyStuakm31sSBSbt9nQdW1DUmOznbUbj80TmNrN6QqpUvTJHJX4fBCSmi/jskPapMosktAk/lg3GKROkmNikYxgMchpgtxjIFhDwsC8MZDxnFv4Yx/72GmeLMZ94yON+0oOXZIZE/WEke2jGB/B9E2kRv+MrW0cYSzt50BHpBaofrKDeIFxjDlCbGWNgCBIxKn0Ni4djGFc7elurZxc/RKxHm3dj27s0WtnzbnHNmtgTWmbsejBnsY0n3FrMLS6JjH0/s71NSTUkIMhkbJGatuQbw0JEx2AVL05LTTk5DCOcm7BCBnCZL+TPpxmLQzkmOS+T/rJOoyVwAH3YrAeOOQpT3nK9M9vzKl/JW3IPipv+rtvvZBSl2yT9RoTMTnXGqpNiAQAxmObBKpPa7N2YydrGhcpBA5JEATmr/5oEX+GaHxlXuNWvZybk58qKWOPGrDBNSRkhCiXRW0VRIGlKEvEtmAIBqRsLxtzUG9s/R71qEdNBk8fwljWwmlIZ5wQWFvjMRhngj4jZ5j3kY985ERS7emprXGNF0IY3+cI9NHXOOZ2zG6uc6K+yfBZh+MHP/jBkw5pi6SV7HxnLGs2DrFGYy35Q5DWYGyR/rGvNUbvqudIYo+eHteQUEMGhcriLUIxxggZRzAXI8X5I4hA7XpzcQSjEEaMQQjnkmQmhFaGMlYi2R9R58yQyb0ekqXTn32Mafw4hhM53D3X2mwTuI+Aa5xnHOMiINsKXHPqj4BZr3bs0RuDTqPACrSxtvi/RTJY3QtukWTSfFZcY/GaKkeOXxJpXSlhsDkky9VIHsF4SMbQhBNDskicUMejQ4haSRpdjYsoKUVEexWhwnUljAHzicDGE9nsZi7HKXekZwNjm8OcbOBclq7k9mbAfWtBPjoST9TmyLqSCRHSNWMhE5Jab/QYBUOgb8jVy1QQ8tTqtEXoAcmIFdeQMA2hN9AasWCLmlu4aGN0Bq9zrgVSJDNVSQYinCHzRQ+E4RzG5CDtGZ4uzrVH5jg+DjykyGiPfvSjJ4LRkQ6IEwKwSQIY4RwTpMxDoDXRFQmz7oj+a4K6hfXTKfbrIeRko3beNWL9cG5ISBFtGQyZdkX2ZcZjSI7yWZ8MZT5OZsSUGobkMG3tI+mgjzb6GDMkOaQIBFkLiZwrrSnpzunqnmvmj44Cp44TsV4BSV/ieCvYEMmBndihh5BnVxJaB5wbElJI1CHFKPL2BR04iVE5l/GcmzdOpwej+N/DyOGezIMcIcohJRmPZGtAL+XcNXPSg050qMHknkxKv0OCnawb2MNcPTLvS0KBBYskvO22264c7U5CC1Bi5kiY6IdjkTCgj0iPs2W7Wso4FxA0e+LHPe5xRyEhsXZkNJ8shFi55xq7JHPTWTZElGNBGTYHhGA93x2KhN/4xjemz4pTz4QWrfwhHyc4XnpC3gcpN+bjYASUhbzITuTLOrKBtjIRYqQ0H1JkNkSDkDEkpJ+9aB5IkjV9HhvWzl8IdqxyvDoTngYJKaMdo8fhDH3oMlMhq5mXAZErm35kTMkTDM61pXsIekgxtkBAeluR6tDYID+Wy3ai57RDgg/sOa3dmunhWpsY9iVhgu9USWghPSCfdj4RIhmnvh46NBDMHCIeAejI6H7yQWrppVdKVK4dSoxJl9aR5kcA5LN98Bmd6HlMmEtAeGqnm0CwV22TSPyza3CGW4skRIiAw3qDLUmyoH1hDxwh+xAOz6KSro8BkR4jMjJji3hkcM8xPdo1u89ojiHkgWT0emzdacMObXvEIpmHs5HAPZ90ybd/nB97Pwh0YRM2YBdbAbq5VkE3EMTub5XVJKx/EDNPkFvFIkRWbzIpvteHwfOgcgwkExLkR0j6JfIzNwLYMyYL0utQJKw6IJ85ZFxf0tBPEGifINEuZfuYoIs1Zg0JkDaJhISpZFslfOhVvGtIyHCJgF0nSzaN0hUMqk11SPogwrEeUDiZ0xlAueNsOpgP6WwdlD06K0scoL3scCgS5uv7nMy2ghXJzZ0v1Jo/D1HmPzYBzckmyYJ0TSYMaYL4E2nd3yrZVvR4cQ0JRWbSfwy7VbIB7U0G2pijlj5tGSJZ+NBgbPNwrExoLgREEuK+1zI5R448MR+ChK77NI8n4DxwyH7JyuZCfqRMtj42BH/WR2wVcu6zIv5kw7TfIuFV7x/tXEPCWkYZqjfYknAejEgoktzj6PThjDwwHAvGTiZCDvOJfmt+8pOfPK03WdE3rJMR6OoTdiVhso0qIyPIdOZyXwVgE8TTlrh3GqjbjcxLT8f1gci62CPBvItIcNDjxTUkhERgjL9VYsBRJIdwdfw44ZgkDOpelxPMTSflkk7KIcdkr2g92sKuJEwJlkXM5TMZpWYWmUk/zj4N0LuSkJ7RJ6QBGZo9BGjabpVstRa/WQ0hTzLBVrEIsLjenoaREU6k1X4McFpgzNGel26VGBHYh4TGRHjHrkXMh+jsfdqQDELCuuY8qAWCA4l8ps0WUeaDVSTMozTm9waMMDyjt0YloiiR0wMCtCTopenTAF0Z17qVZw5Qmp27lw077EpC2a+F+zXbnCZScdjcOulYtwOjJ2PrSJv0sYasfyR8Ddrmr3tUDEmI+e1gJhM9jAuO2zZEdCVyemCEumgiWpTH8wL6132rErkLCWUYaz2rIOshgYYUbRLhuxbRvW5lIoIUVFB86HEiQXjHHXdMyanFdSREnOxJ2kmd1+w2enjJpCF0D5zU65u9w1nC+r2qoY+s4NOGfSsJZQAlOHsp9joPEBj2wK0PELK1vy1VynFvm4J0AYJlD10lyQhRe/69joQMhrEQ47aCjHNPS+7DiITmqAuSBVP2ztpRHOPLDfas1oFYPumbrAFLJKzr4UjZ0Diu9/bKpwkEpCdSSBg147eZkJ/nHkpkUzbrkS+SxDXy7XUkxNQ8nEjDvUEj7R6hCoJaQBSocK0tx845mpyVkzjg8Y9//LRu+shkqQo168MSCSMpP8aTFdkWGc+SiAkQuvmHlQjkmnW3JAxx6F3XFbH2XoaskrWOktJ1JIQ0pmRv0DWSfWEI3SJlLsJJyMmRZwGZj0EFlozHsNlQW4fsIWPTlV1GJKyBiWxIrb9jBOVspb2WsdOG8sje1hwC0cu1BE0QLrQPkmvFugERR/viWRIy3hLLRxIjj9gvwiyMQbTneHIWGUJJ8febfSIIw9EprxboGqKRZDXHkHtxVLKm/tbn3aNzgeke27hnvjWQjRHmULYZ7cdbXwmqzLsrD/KwOXoogS4J6xcZdo0AjkJihk9J6yHZVsY011k8ISMGx9BXRki5ishufhcFQSsBCQfliZD+7hnHOXL6fmDuE2PpIyu2pa+CzdzXFwESEIcAG9M1wea4V4FkLmtBxOi/VfL+s/d+MOiSkEJ5nyM6eoOvESWXwUdpGLLh5XjzcvIcaY8BJEQeXyRgcLpkD4QsnCaj+bmvT4at6yQJOm0FlqxuDMcp0ebRLn3ioEBbfXqb/DkbbgHb2lrQFfmsdYTM2QblFkn2HlVE6JIQspcLSXYRmQDmFEjWEO0U5sTMvS8QhqEjr3rVq67JYnkpy/nmR0AZ0fz5GarrnOHcGNpYVy3PkZBIG21rQDlGcjrJcPRIOXYt+81WtNO394C3C8xFR3oZf+QbCUGQaLdrKWYD4NfeFxeCIQkphyBQo3eLUN4YnD1nRMpqz3kW7QsEjhNFu4KTU3KUNcbnBHr5rPDnPQIZKyTTR1+ZLRnk+c9//qQzgsgSsqUxERXB9AsJXeNQ7dhAn7QPQVtCI6RrAjL6G6vVeRfQh12sy7g+e0gp9ll12yIhuO2dAB1hSELEufPOO6fjXtSvlex75rJhyhsDQcoRJ+wLRG7159BKGm2yb3Pdp3eF7qcPwmhD9EckZE1Jpau+ebI2JsMnw/lE9JAzezyE0Me1jE+MgbiCEXlzbZeyTJcQWCBZS/TqJQfkCzkTBLtIiLfzP1isirSvU7ZIUjIjJPJ7iMMpHtLMEXcrkIWjjRuiOOYMwuEhBx08iNTXLWyAaI5lM/ZBRG0RpBJOEMV+SEOQ3TVttTE/B7OPuX1mbO1tC4zvwYY92v3jVlhLMnLsG9+04CvrIdrtImwM1rwzCaGSIAbeRSwGAeeiWLRyCjIyVPpy6KFAB2Obg3E4lkOQLyRANPdTrpDC2pFGe58MzKEI5dMYkGCVvbwEliljN+PoZ+xcs17H+mftyOrdorGNQ899kQcv/szcWUMP8Tt9tN1FzAn+3qWAmsMsCetermaFrWIxwLEjozJ+DBRBjkPsg1r0MixD0VP2qTrQCSE4jSNDWGQkIaF7ruenDyGr68YxtnN2zC8ztaUQyQ9FvArz1jU5H1UlOiRpWEPtt0WytqUsCLMkhJRkg/YmWytZ2IhUcVaVfcux7MqpHI8YzufA+fZMeULmLMRKluQUeziSklYl5S7n1qSt42Q84xLXtc34I6H/vhA42dtZA6KNbJvr2XrsIuYC9gx/5rBIQn/eNZGZhewiS9kQSZXr2kcGyr21zsg4HExkNk6QoWRbBJsTxEFa/bRvMyPhSGO215Ew2SMPV6oJp4N1s6Hxe/1bEQRLgTMHfdmjjml97GP+FofKgtl2GU+wLWGRhAbJP0xuSbJVssBRdCCqxXM+I8keHMeYriPlnFNkjsyFBAhUM9M+YjzjI4ZjQeFYxkAs+jG6tnQ3N5H9EgzIlwzneo57Yjz22hUyGlF52rWQECWoWWufLEjvlPre36fuYZGEkBS9b4RwBoyelJONgAM4M8biGM4mc0TUnxERpM6N0NXJCBFHRVy3V6vXEN91x3GOsWtAyi4JmmwrHLOVwGrHc73qE8JGEji7kJBtjKm/oKAzwpsvuiYzV8QnNZvvIqlexpJM1mAVCZOmYZ8oIcYSdRyyBNmGQRhG9smDAyL2SnoLWdw8IUmP+GtgHOu++eabJwcby5cSGNx66Mfg9ONs1zneZy/glGj99bVGa6pbBfdD4C2gh4ce+unPRvQVNNmH9kC/BLs5e35bK+GJ8db4CFaR0GB5yqFwb/KetNmIIITxPOj0IjJANAviTMchP6c5lsm2gAPWGgUqgTmUY6M/h44ILRMhFAJaPz3pq71+yfQ+kx1H0pbMOVibd4psJhBkU7ZyTCfXR5nJXPrnFdOukkpnrLkvLLRYRULws78Yfk20WDxDI1B7L++QLH5UWjmA47P3Sl+EQGBkSNTtAmO0pd14dOLMqq92c5lkhEpI+gooa08ZJq6bgwOtWTbbBfoiu/mMx2ZsZY74q0dC9mULuqZk7ypJKpUra7CahAbNvwrlrJ4SEYZOtusRlnGMoQ2n9+BejKJ97c/ADMroW8HYXiTLUMbiPMe+IWPcZDzE24cULUJIZDMPQtIfQXvro5PMtBZecCNBO5ZtTOaoAQd8ao1An9qPsH/KeXuvFfYCfttapVaTEJBwKRsinjZ1UXFsFRkgRBWNPTAQ4zFE29/8WfhayMz+06WMxiHGoVv0M88hiTcC+whUc3J0SrbPXjZCpNi9B2vxi1ktWdjImtmwF7BJFqMyrF/N/hKH8Xq+TxZkv60VahMJKZxab6I26hiQ0i3plLKecWOYkeOTDS2aodpxnYfwIyKDccyF+LKR9tHd5+hp/Zigky80IBDd6ZSHHWREPPrJnCOnhiApwQlMxz6tCTHZsF2fNScYe76JsBldPDzFzq3fBS9Y09YsCJtICLXec2xVhlAixwzBMJTOV9xbSQQlKlsgqHaco23bXyb12dvvAHLHMa1wEANGh9OGNXOyIKUnQiAHmwkw5BgBgVJNEJUvYit9ETdEbtcnoHOtl9VakrF92rWJgCRIcGNrFoTNJLRoRgNkbJXiWEYhjJTriaTaluifiOyVDPOlHPf2Jvoy/qg00/HY5XUf0J896U+sJfZgmx7YiV2QLKU0fkAgARkCxleBsREd3IsdI/q7LkAqGc2ZMask89FnyxNxxWYSgigK4xN9I7EQ5AtZem2QldGRZfSgYs42o8kUCBqS0sk8zo130SBglDuZx4MS2/UyS8qudjWwtXeNXZCy3aIYH7lgtA9M5Wqvm68t2+ZIVUTAXW2+EwkhZBEBLTmiIHIxkkVplwX2FilzgvLaRu8I7XbA+MmWxrnosIZeFmdT65TRYs8EIxuwX8gRpNLwg0BN5qziWq9a9fxLsgW6++67h9uhNdiZhIyTX4YSrS2xEDAkYRywSCldNNa2kaR2Ubq0qJEhjb3LvuQiQcDWNScjslsPiMcXiIicvW0NQTZ+be3aI2Z8CqPqtRY7kxDqQwpFWkUj9oOIwVh1n9gTbYFBl554qzEZ0LlgYPDzvA/cAuuU8ZKNsi9LaUQYGVMG7AWu/gITAckoq0W8guFTJHOO8G0ZZuPY15dbJIR9sBcJLTAvsKG3cSUWhlBthLURHVlLREav/ZQhzjAPY9OHA3fdq5wV4mCBa29oL+3aqIKQ7PUq1hKwPqCwXWxm/l6fPNgg69pvysxhLxKCKMxXvRiqLcukl86VXkZKxLUSIiJwFt2CodxHVtGKlMakAzK6Z25fVA2ZU8ZHY54l6MqxHG9N+YPq1plXX3XvbH2kt/3QZw0Bs09sA3okmR+Mr+++2JuEIBpSltcsRmRTntHb7Fgl0c3Iyv3aBcdhyjNn0Y3xzOsYSfPw47znxGMDMdgqa6QbWwgmdkFAQe2tQMqhgNVvCfrFXtY3ImDEfeMifi+JROhR/bxvGQ4OQkKLrb9L0Mt8BCkY1YJrKWaEkaHsI43PsMgVI8xB27pfDOFuvfXWyTnuyZRAF8a1V01WVsYTKPuCviGb8UkcjXQcSVyzPvPK3GmfdmuDUGbUFgRXtUOV1ubWz276jPxnbKDvISvJQUgIFhBnM1aPVAjVRibjM7aFj4iIFMhiXAaW3ZZAnziRGFsAcG6uJZKzX03J1peRb7nlltk96RzoilTWh/DIxYm5Zj4OT8A4Z4MQ1KdApcea7AfsH31lNWNmrVUyLlSb04NOvX70B7okex8KByMhWDhHA+P2FjMimr76jJ6eYyCQWdZGojHpxKky3k033XQ1O/gMEVPCtXFsDmT36f/fZe41QECBg1T6IYbjlFVrTAb0H51ip6ydrvqtJaDAtrfLWhDGOD2x185941d7x0Y5j6RqgIq3NijW4qAkBNEYY3BiIntOONrCEFSU9QxBjKUttIafA2Onvz5EljSfa0gnw47mjeiD0DLaaFuAgDIN5/YCzvpCSucI6FrGpUdIqf+Sw/Vjc/Nqq9rU+aoY17za6pPA8plAbfsIJu2h+vaQODgJgZNjPBmuXVgVpLLIOIyjGWPOmJwcEui/JitycByfTBRyzgnH0aUllOshC0eFyGkny4bwPedG3LNm7WRtYLulzJsgzNaEneeCt+rAfmwuK7IFu/QCxr340d8XRNRj4CgktMDXve51VyMIUdoFEkbQhlHqdQZxXYYYORABalZEAI5YgnacnSxNOAFJUwLrXrKdM+VLP05xzPmyRI7TpifutdnQ+s2/BuyinNY9WsbpSYKBrev1ENF6E0xV9EtQsJUfTBwLRyEhME59Yub8dqGkzXgMkn2c87nyTGpWZCztl7JI0DohDkNmmZKjje+6+4jX6uJcf/3SNp/ITOypkIBeycgJLvquhaBjx6x3LvsRerBvT29Cp14GtJ7YkC92/XbMWhyNhGABjBaMiFiFk/RjPEbksLnMQhiZQZEKENhcKVVLMF/PGRHzI1kyTrIgkiIZXUNUbd1zzbu+EFHJrmMixZrMDSEfPUGAsE0drxXjx5ZIZS56L9myJWD137FwVBICgynNwYiIjKZEiXIOZXgGIe4jiZKXDNITYyBGyMgJ5striyWkFBNONlbdiNv3uT4qndFPO6AHQiJvxiXmiY4jqCTmr+TzOVd6Cdsl69GF/sS8CChYc7+VSkDzb8nS++DoJITf//73q4iIaDKO4zZiOZgTlLa5rEVaMnKCOTPGMcF5I5KuQQKH/im7a8hH8iTLRrnGjnSqAdIL5B4BlwLlUDgVEgIi1j2ibNAaIsZAREYLERkXUoLyUFH79cRYjBniMWpKW5vlzhJKJZ1IJbDrlVBLwl76I2+1jzFaclaRPWMLtqLHaREQTo2EYIH1WzeMnHLbSi0pIhR5ch2yB1srCFzLsmh3zuAIr2wm8xwbgkgQmNf8de9KB9fXrI/tBHO2Lq7Zi7Kz8dOOzdo9aUSZZgvw5VT6nDZOlYTQRhqCjQzOsNknhpQ5X5MJe2JMpQ3parTTK1kyIkhkljhpK2QX/Y0bwsnMxq1zW0/2oz2dR2ItxmNDcyGabCfgwHhzdlKao4dKdeyn4BFOnYSQPUcyj/ORAxgRaRiWo+ba7iLGRZBaBoOQyLwhUCUpuf3226+7FkH0Homt2z3jLe1vW2nbsw/ieeCAbHMQfW4fKVMGXkQLlLPCmZAQRCDn33XXXVeuzP+xJdkS+VJ2RsIJeb2zS7aUTTiPkxBo332jMRACSeiUjL6r0Mf66jV2Ma5Pc7k2spPrNeDYS0CcJc6MhIEIrG/jGXFXRyEQJznmqGzEdy3drXDyGtma3bYIewngNmAFztI+UhDU6iMT7xtkh8CZkxBszOu3MxiKwXqGnBNRnv1VJbIsxEk+j0mQfYX+gmcuaNgFAaE+fCD/qJ/rqk5gD2m70G4TzgrngoTAIAyTd1Ug6pfKb0TW09Yn1PeMriMluO/h5lDZcV+hmwcEgYNI9EsG7wkCCiQi4ObaklSHQNU5y/1fD+eGhIHfV6lGYui5DXZEaclrCH3al90c7QnYcc2G5soxyRjHEuO3RLM+QSgwlua3TmUXeecCyX3EDtgEgc9D+W1x7kgIDOZ9YjWYzfRSKXV/lEn0V5LqNaUNUrp9KtnayciIiyAI7bPu+zIGIqQUcnyu9wQpQjJ7X+eO9QMk8ZBQ+7RibUtZnN5sGAg0r1/qa6HzhHNJwkBW5KhqPOdbH1xSimuWQSzCWdl/hkRIaJ/qOISWRTkXAWr2jD7IW8nZiuwFOdcW8jCRIKHTEslGYsy6nRHEtjjnMftVnGsSgjIlivNrpYCUNuVrySjDcE5IxsmuIRiyIVdtLxvZN9ZrSCgbInKdl34h35w+sjSEdMl+6ZtSWfusFWPU1y50QmgBchFw7kkYcJASXY0dMi69mqiCgLJW9oz616dMYi57r3rNXBzbktM1QPI5Pcwr61bCGzOBISCQZmlPWEUGb+3hwaP+75mLgAtDwsB/HlViqvFBidziQCJzIRsi5RqyQPtCGGSclEvkIcaQ5eiD3LVPK0iDrD6zx+y1mxNz61vLbsinYtS94EXBhSNhgIyMboNfIYvJNskwWwWh6pM2yQNMiJM9ocwXArtH0ufQgvwypVIbOJbFLyr5ggtLwsAP3mVGxKglyLHSufTyd4sYBwnzlJ7zeu2QguTZz1Zka4J8lZQXFReehIEHB06RmTipIoSUqdY+zJyVJBO3xLMGf4rPT5bagLvouGFIWKFEy449QgIHK2Oy5JaHmmOIsi/bCZJeSfUNF+vwsCHQbkTckCQMZAuvdhBS+bKP7IHzPVhoh5jK66FKeEQGNi7C2du1D1aB8kpn+iJeL4huNNzQJGzhnaCSTWTC+o3mEWRNhAlJ10hIRpayF9LJ3NFL3xs1441wjyJhCyRR6rKXJK4dK/sY24twRM2cXq3cE7LdHO7RJGyhfCNKSnib3dprZPTNauRqrxm7feC4xCUJL3EOcEnCS5w5Lkl4iTPHJQkvccY4Ofk/h2jagJrDs5gAAAAASUVORK5CYII="

function insertMultipleParagraphs() {
  LSGETNUMBEROFPARAGRAPHS = sessionStorage.getItem("extraParagraphs");
  var paras;
  var result = '2.  ' + sessionStorage.getItem(0);
  paragraphInfo[0] = new TextRun(result).break();
  for (paras = 1; paras <= LSGETNUMBEROFPARAGRAPHS; paras++) {
    var PARAGRAPH = (paras + 2) + '.  ' + (sessionStorage.getItem(paras));
    paragraphInfo[paras] = new TextRun(PARAGRAPH).break().break();
  }
}
class GenerateWordDocument extends Component {
  generateWrappedDocumentWithHeader = () => {
    // Create document
    const doc = new Document({
      creator: "USAF",
      title: "Sample Document",
      description: "A brief example of using docx",
      titlePage: true,
      styles: {
        paragraphStyles: [{
            id: "Body1",
            name: "Body1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
            }
          },
          {
            id: "Department",
            name: "Department",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial",
              bold: true
            }
          },
          {
            id: "Unit",
            name: "Unit",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial"
            }
          }

           ]
      }
    })
    insertMultipleParagraphs();
    console.log(DoDSeal.toString("base64"));
    const dodseal = Media.addImage(doc, Buffer.from(base64image, "base64"), 105, 105, {
      floating: {
        horizontalPosition: {
          offset: 400000
        },
        verticalPosition: {
          offset: 405000
        }
      }
    });
    doc.addSection({
      size: {
        height: 15840,
        width: 12240
      },
      margin: {
        header: 0
      },
      headers: {
        first: new Header({
          children: [
             new Paragraph({
              spacing: {
                before: 280
              },
              text: "DEPARTMENT OF THE AIR FORCE",
              alignment: AlignmentType.CENTER,
              style: "Department"
            }),
             new Paragraph({
              text: LSGETUNIT,
              alignment: AlignmentType.CENTER,
              style: "Unit"
            }),
             new Paragraph({
              children: [
                 dodseal
               ]
            })
                    ]
        })
      },
      children: [
              new Paragraph({
          spacing: {
            before: 720
          },
          text: LSGETDATE,
          alignment: AlignmentType.RIGHT,
          style: "Body1"
        }),
             new Paragraph({
          text: "MEMORANDUM FOR  " + LSGETATTN,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "FROM  " + LSGETFROM,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "SUBJECT  " + LSGETSUBJECT,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "1.  " + LSGETPARA,
          style: "Body1"
        }),
            new Paragraph({
          children: [
                paragraphInfo[0],
                paragraphInfo[1],
                paragraphInfo[2],
                paragraphInfo[3],
                paragraphInfo[4],
                paragraphInfo[5],
                paragraphInfo[6],
                paragraphInfo[7],
                paragraphInfo[8],
                paragraphInfo[9]
              ],
          style: "Body1"
        }),
           new Paragraph({
          indent: {
            left: 5040
          },
          children: [
               new TextRun(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH).break().break().break().break(),
               new TextRun(LSGETDUTYTITLE).break()
             ],
          style: "Body1"
        }),

         ],
    });
    Packer.toBlob(doc).then((blob) => {
      // saveAs from FileSaver will download the file
      saveAs(blob, LSGETSUBJECT + ".docx");
    });
  }
  generateWrappedDocumentNoHeader = () => {
    console.log("NO HEADER");
    // Create document
    const doc = new Document({
      creator: "USAF",
      title: "Sample Document",
      description: "A brief example of using docx",
      styles: {
        paragraphStyles: [{
            id: "Body1",
            name: "Body1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
            }
          },
          {
            id: "Department",
            name: "Department",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial",
              bold: true
            }
          },
          {
            id: "Unit",
            name: "Unit",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "arial"
            }
          }

           ]
      }
    })
    insertMultipleParagraphs();
    console.log(DoDSeal.toString("base64"));
    const dodseal = Media.addImage(doc, Buffer.from(base64image, "base64"), 105, 105, {
      floating: {
        horizontalPosition: {
          offset: 400000
        },
        verticalPosition: {
          offset: 405000
        }
      }
    });
    doc.addSection({
      size: {
        height: 15840,
        width: 12240
      },
      children: [
           new Paragraph({
          text: "DEPARTMENT OF THE AIR FORCE",
          alignment: AlignmentType.CENTER,
          style: "Department"
        }),
           new Paragraph({
          text: LSGETUNIT,
          alignment: AlignmentType.CENTER,
          style: "Unit"
        }),
           new Paragraph({
          children: [
               dodseal
             ]
        }),
              new Paragraph({
          spacing: {
            before: 720
          },
          text: LSGETDATE,
          alignment: AlignmentType.RIGHT,
          style: "Body1"
        }),
             new Paragraph({
          text: "MEMORANDUM FOR  " + LSGETATTN,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "FROM  " + LSGETFROM,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "SUBJECT  " + LSGETSUBJECT,
          style: "Body1"
        }),
             new Paragraph({
          style: "Body1"
        }), //SINGLE SPACE CARRAIGE RETURN
             new Paragraph({
          text: "1.  " + LSGETPARA,
          style: "Body1"
        }),
            new Paragraph({
          children: [
                paragraphInfo[0],
                paragraphInfo[1],
                paragraphInfo[2],
                paragraphInfo[3],
                paragraphInfo[4],
                paragraphInfo[5],
                paragraphInfo[6],
                paragraphInfo[7],
                paragraphInfo[8],
                paragraphInfo[9]
              ],
          style: "Body1"
        }),
           new Paragraph({
          indent: {
            left: 5040
          },
          children: [
               new TextRun(LSGETWRITERSNAME + ', ' + LSGETRANK + ', ' + LSGETBRANCH).break().break().break().break(),
               new TextRun(LSGETDUTYTITLE).break()
             ],
          style: "Body1"
        }),

         ],
    });
    Packer.toBlob(doc).then((blob) => {
      // saveAs from FileSaver will download the file
      saveAs(blob, LSGETSUBJECT + ".docx");
    });
  }
  fillVariables() {
    LSGETATTN = sessionStorage.getItem("attn");
    LSGETFROM = sessionStorage.getItem("from");
    LSGETSUBJECT = sessionStorage.getItem("subject");
    LSGETPARA = sessionStorage.getItem("para1");
    LSGETUNIT = sessionStorage.getItem("unit");
    LSGETDATE = sessionStorage.getItem("date");
    LSGETDUTYTITLE = sessionStorage.getItem("dutytitle");
    LSGETRANK = sessionStorage.getItem("rank");
    LSGETWRITERSNAME = sessionStorage.getItem("writersname");
    LSGETBRANCH = sessionStorage.getItem("branch");
  }
  render() {
    this.fillVariables();
    return (<div style={{display: 'inline'}}>

      <button style={{margin:'5px'}} onClick={this.generateWrappedDocumentWithHeader} type="submit">
        Generate Word Document (Must Enter Header and Select 'Different First Page')
      </button>
      <button style={{margin:'5px'}} onClick={this.generateWrappedDocumentNoHeader} type="submit">
        Generate Word Document Without Header
      </button>

    </div>)
  }
}

export default GenerateWordDocument;
