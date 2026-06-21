#include <pybind11/pybind11.h>
#include <pybind11/numpy.h>
#include <string>
#include "PCNNetwork.h"
#include "PCNLayer.h"
#include "Activations.h"
#include "Optimize.h"
namespace py = pybind11;
PYBIND11_MODULE(deepity, m)
{
        py::class_<Deep::PCNetwork>(m, "PCNetwork")
            .def(py::init<>())
            .def("add_layer", [](Deep::PCNetwork &self, size_t inSize, size_t outSize, float lr, float ir, int stepSize, const std::string &act)
                 {
ActivationFn fn;
if (act == "tanh")         fn = Deep::tanh;
else if (act == "sigmoid") fn = Deep::sigmoid;
else                       fn = Deep::relu;
self.AddLayer(inSize, outSize, lr, ir, stepSize, fn); }, py::arg("in_size"), py::arg("out_size"), py::arg("lr") = 1e-4f, py::arg("ir") = 1e-4f, py::arg("step_size") = 30, py::arg("act") = "relu")
            .def("add_layer", [](Deep::PCNetwork &self, Deep::PCLayer &layer)
                 { self.AddLayer(std::move(layer)); })
            .def("compile", &Deep::PCNetwork::Compile)
            .def("inference_step", [](Deep::PCNetwork &self, py::array_t<float> x)
                 { self.InferenceStep(x.mutable_data()); })
            .def("generation_step", [](Deep::PCNetwork &self, py::array_t<float> x)
                 { self.GenerationStep(x.mutable_data()); })
            .def("flush_inference", &Deep::PCNetwork::FlushInference)
            .def("flush_generation", &Deep::PCNetwork::FlushGeneration)
            .def("total_energy", &Deep::PCNetwork::GetTotalEnergy)
            .def("save", &Deep::PCNetwork::SaveModel)
            .def("load", &Deep::PCNetwork::LoadModel);

        py::class_<Deep::PCLayer>(m, "PCLayer")
            .def(py::init([](size_t inSize, size_t outSize, float lr, float ir, int stepSize, const std::string &act)
                          {
    ActivationFn fn;
    if (act == "tanh")         fn = Deep::tanh;
    else if (act == "sigmoid") fn = Deep::sigmoid;
    else                       fn = Deep::relu;
    return Deep::PCLayer(inSize, outSize, lr, ir, stepSize, fn); }),
                 py::arg("in_size"), py::arg("out_size"),
                 py::arg("lr") = 1e-4f, py::arg("ir") = 1e-4f,
                 py::arg("step_size") = 30, py::arg("act") = "relu")
            .def("calc_prediction", &Deep::PCLayer::CalcPrediction)
            .def("calc_step_error", [](Deep::PCLayer &self, py::array_t<float> x)
                 { self.CalcStepError(x.data()); })
            .def("update_beliefs", &Deep::PCLayer::UpdateBeliefs)
            .def("update_weights", &Deep::PCLayer::UpdateWeights)
            .def("run_prediction", [](Deep::PCLayer &self, py::array_t<float> x)
                 { self.RunPrediction(x.data()); })
            .def("run_prediction_batched", [](Deep::PCLayer &self, py::array_t<float> x)
                 { self.RunBatchedPrediction(x.data()); })
            .def("flush", &Deep::PCLayer::Flush)
            .def("attach", [](Deep::PCLayer &self, py::array_t<float> x)
                 { self.Attach(x.mutable_data()); })
            .def("get_prediction", [](Deep::PCLayer &self)
                 {
size_t n = self.GetBatchSize() * self.GetInputSize();
return py::array_t<float>({(py::ssize_t)n}, self.GetPrediction()); })
            .def("get_inference_err", [](Deep::PCLayer &self)
                 {
size_t n = self.GetBatchSize() * self.GetInputSize();
return py::array_t<float>({(py::ssize_t)n}, self.GetInferenceError()); })
            .def("get_beliefs", [](Deep::PCLayer &self)
                 {
size_t n = self.GetBatchSize() * self.GetOutputSize();
return py::array_t<float>({(py::ssize_t)n}, self.GetBeliefs()); })
            .def("get_weights", [](Deep::PCLayer &self)
                 {
size_t n = self.GetInputSize() * self.GetOutputSize();
return py::array_t<float>({(py::ssize_t)n}, self.GetWeights()); })
            .def("get_lr", &Deep::PCLayer::GetLR)
            .def("get_ir", &Deep::PCLayer::GetIR)
            .def("get_input_size", &Deep::PCLayer::GetInputSize)
            .def("get_output_size", &Deep::PCLayer::GetOutputSize)
            .def("get_batch_size", &Deep::PCLayer::GetBatchSize)
            .def("get_size", &Deep::PCLayer::GetTotalSize);
        m.def("get_L2_cache_bytes", &Deep::GetL2CacheBytes);
        m.def("auto_batch_size", &Deep::AutoBatchSize);
        m.def("relu", [](py::array_t<float> x)
              { Deep::relu(x.mutable_data(), x.size()); });
        m.def("tanh", [](py::array_t<float> x)
              { Deep::tanh(x.mutable_data(), x.size()); });
        m.def("sigmoid", [](py::array_t<float> x)
              { Deep::sigmoid(x.mutable_data(), x.size()); });
}